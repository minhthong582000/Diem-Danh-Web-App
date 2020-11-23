const authService = require('./auth.service');

module.exports = {
    loginForAdmins: async function (req, res, next) {
        try {
            const DTO = await authService.login(req.body, 'admin'); // for admins and editors

            res.json(DTO);
        } catch (err) {
            next(err);
        }
    },
};
