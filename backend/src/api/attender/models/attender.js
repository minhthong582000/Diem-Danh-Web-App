const { deleteAllFile } = require('../../../common/file/utils');
const { createQrCode } = require('../../../common/qrCode/utils');

module.exports = (sequelize, Sequelize) => {
    class Attenders extends Sequelize.Model {}

    Attenders.init(
        {
            code: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                unique: true,
            },
            username: {
                type: Sequelize.STRING(255),
                unique: true,
            },
            name: {
                type: Sequelize.STRING(255),
                unique: true,
            },
            qrCode: {
                type: Sequelize.STRING(255),
            },
            seat: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            status: {
                type: Sequelize.ENUM({
                    values: ['in', 'out', 'absent'],
                }),
                allowNull: false,
                defaultValue: 'absent',
            },
        },
        {
            sequelize,
            modelName: 'attender',
            timestamps: true,
            underscored: true,
        },
    );

    /**
     * -------------- HOOKS ----------------
     */

    function createImage(attender, options) {
        const url = createQrCode(
            `${Date.now()}`,
            `${
                process.env.FRONTEND_HOST || 'http://localhost:3002'
            }/seat?code=${attender.get('code')}`,
        );

        return attender.update({
            qrCode: url,
        });
    }
    Attenders.afterCreate(createImage);

    function deleteQRCodeImage(attender, options) {
        deleteAllFile();
    }
    Attenders.afterDestroy(deleteQRCodeImage);
    Attenders.afterBulkDestroy(deleteQRCodeImage);

    return Attenders;
};
