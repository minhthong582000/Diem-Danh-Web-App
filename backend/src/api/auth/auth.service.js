const models = require('../../models');
const { issueJWT } = require('../../common/crypto/utils');
const AppError = require('../../common/error/error');
const { httpStatus } = require('../../common/error/http-status');

module.exports = {
    login: async function (credentials, forRole) {
        const user = await models.user.validateUserCredentials(
            credentials,
            forRole,
        );

        if (!user) {
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                'Invalid Credentials.',
                true,
                'invalid.credentials',
            );
        }

        const jwt = issueJWT(user.id);

        return {
            user: { username: user.username, role: user.role.name },
            token: jwt.token,
            exprires: jwt.expires,
        };
    },
};
