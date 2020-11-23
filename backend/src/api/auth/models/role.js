module.exports = (sequelize, Sequelize) => {
    class Roles extends Sequelize.Model {}

    Roles.init(
        {
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true,
            },
            description: {
                type: Sequelize.STRING(255),
            },
        },
        {
            sequelize,
            modelName: 'role',
            timestamps: false,
            underscored: true,
        },
    );

    /**
     * -------------- ASSOSIATION ----------------
     */

    Roles.associate = function (models) {
        Roles.hasMany(models.user, {
            foreignKey: 'roleId',
            as: 'role',
            onDelete: 'RESTRICT',
        });
    };

    return Roles;
};
