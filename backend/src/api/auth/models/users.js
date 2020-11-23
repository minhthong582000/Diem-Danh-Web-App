/* eslint-disable no-param-reassign */
/* CREATE TABLE "User" (
    "id" int PRIMARY KEY AUTO_INCREMENT,
    "idStudent" nvarchar(50) NOT NULL,
    "name" text NOT NULL,
    "dateOfBirth" datetime NOT NULL,
    "major" text NOT NULL,
    "email" text NOT NULL,
    "userName" text NOT NULL,
    "passWord" text NOT NULL,
    "idRole" int NOT NULL
); */

const crypt = require('../../../common/crypto/utils');

module.exports = (sequelize, Sequelize) => {
    class Users extends Sequelize.Model {}

    Users.init(
        {
            username: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: {
                    args: true,
                    msg: 'User with this username already exist.',
                },
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            roleId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'user',
            timestamps: true,
            underscored: true,
        },
    );

    /**
     * -------------- ASSOSIATION ----------------
     */

    Users.associate = function (models) {
        Users.belongsTo(models.role, {
            foreignKey: 'roleId',
            as: 'role',
        });

        /**
         * -------------- SCOPES ----------------
         */

        Users.addScope('role', {
            include: [
                {
                    model: models.role,
                    as: 'role',
                    required: true,
                    attributes: {
                        exclude: ['id', 'description'],
                    },
                },
            ],
        });
    };

    /**
     * -------------- HOOKS ----------------
     */

    function encryptPasswordIfChanged(user, options) {
        if (Array.isArray(user)) {
            user.map((u) => {
                if (u.changed('password')) {
                    const hashedPassword = crypt.genPassword(u.get('password'));
                    u.password = hashedPassword;
                }
            });
        } else if (user.changed('password')) {
            const hashedPassword = crypt.genPassword(user.get('password'));
            user.password = hashedPassword;
        }
    }

    Users.beforeCreate(encryptPasswordIfChanged);
    Users.beforeUpdate(encryptPasswordIfChanged);
    Users.beforeBulkCreate(encryptPasswordIfChanged);

    /**
     * -------------- INSTANCE METHOD ----------------
     */

    Users.prototype.validPassword = function (password) {
        return crypt.validPassword(password, this.password);
    };

    /**
     * -------------- CLASS METHOD ----------------
     */

    Users.validateUserCredentials = async function (credentials, role) {
        const { username, password } = credentials;

        const user = await Users.scope('role').findOne({ where: { username } });

        if (
            user &&
            user.validPassword(password) && // password is validated
            (user.role.name === role || user.role.name === 'editor')
        ) {
            return user;
        }

        return null;
    };

    return Users;
};
