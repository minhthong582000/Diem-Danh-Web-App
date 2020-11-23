const path = require('path');

const attenderService = require('./attender.service');

module.exports = {
    checkin: async function (req, res, next) {
        try {
            const { identity } = req.body;
            const DTO = await attenderService.check(identity); // for admins and editors

            res.json(DTO);
        } catch (err) {
            next(err);
        }
    },

    countAttenders: async function (req, res, next) {
        try {
            const DTO = await attenderService.countAttenders(); // for admins and editors

            res.json(DTO);
        } catch (err) {
            next(err);
        }
    },

    getAll: async function (req, res, next) {
        try {
            const attenders = await attenderService.getAll();

            res.json(attenders);
        } catch (err) {
            next(err);
        }
    },

    seedQRCode: async function (req, res, next) {
        try {
            const DTO = await attenderService.seedQRCode();
            res.json(DTO);
        } catch (err) {
            next(err);
        }
    },

    exportXLSX: async function (req, res, next) {
        try {
            await attenderService.exportXLSX();

            res.sendFile(
                path.join(
                    __dirname,
                    '..',
                    '..',
                    '..',
                    'DanhSachDaiBieu_Vitringoi_Exported.xlsx',
                ),
            );
        } catch (err) {
            next(err);
        }
    },

    deleteAll: async function (req, res, next) {
        try {
            const deleted = await attenderService.deleteAll();
            res.json(deleted);
        } catch (err) {
            next(err);
        }
    },
};
