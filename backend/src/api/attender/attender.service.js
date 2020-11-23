/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */

const xlsx = require('xlsx');
const path = require('path');

const models = require('../../models');
const AppError = require('../../common/error/error');
const { httpStatus } = require('../../common/error/http-status');
const { getSeat } = require('./attender.seat');
const { switchStatus } = require('./attender.enum');

module.exports = {
    check: async function (identity) {
        const attender = await models.attender.findOne({
            where: {
                code: identity,
            },
        });

        if (!attender) {
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                'Attender with this identity does not exist.',
                true,
                'invalid.credentials',
            );
        }

        attender.set({
            status: switchStatus[attender.status],
        });
        await attender.save();

        return {
            seat: getSeat(attender.dataValues.seat),
            status: attender.status,
        };
    },

    seedQRCode: async function () {
        const promises = [];

        for (let i = 0; i < 195; i += 1) {
            promises[i] = models.attender.create({ seat: i + 1 });
        }

        await Promise.all(promises).catch(function (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                throw new AppError(
                    httpStatus.UNPROCESSABLE_ENTITY,
                    'Already generated.',
                    true,
                );
            } else {
                throw err;
            }
        });

        return 'Done.';
    },

    exportXLSX: async function () {
        const wb = xlsx.readFile(
            path.join(
                __dirname,
                '..',
                '..',
                '..',
                'DanhSachDaiBieu_Vitringoi.xlsx',
            ),
        );

        const ws = wb.Sheets[wb.SheetNames[0]];

        const data = xlsx.utils.sheet_to_json(ws);
        const attenders = await this.getAll();

        attenders.forEach((a) => {
            data.forEach((d) => {
                if (a.seat === d['VỊ TRÍ NGỒI']) {
                    d.qr = a.qrCode;
                }
            });
        });

        // Export to new file
        const newWB = xlsx.utils.book_new();
        const newWs = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(newWB, newWs, 'Danh Sach Moi');
        xlsx.writeFile(
            newWB,
            path.join(
                __dirname,
                '..',
                '..',
                '..',
                'DanhSachDaiBieu_Vitringoi_Exported.xlsx',
            ),
        );
    },

    countAttenders: async function () {
        const { rows: count } = await models.attender.findAndCountAll({
            attributes: [
                'status',
                [
                    models.sequelize.fn(
                        'COUNT',
                        models.sequelize.col('status'),
                    ),
                    'count',
                ],
            ],
            group: 'status',
        });

        return { count };
    },

    getAll: async function () {
        const attenders = await models.attender.findAll();

        return attenders.map((a) => {
            a.dataValues.seat = getSeat(a.dataValues.seat);

            delete a.dataValues.code;

            return a;
        });
    },

    deleteAll: async function () {
        const deleted = await models.attender.destroy({ where: {} });

        return { deleted };
    },
};
