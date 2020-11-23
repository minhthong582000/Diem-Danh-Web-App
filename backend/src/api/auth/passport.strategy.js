const passport = require('passport');
const passportJWT = require('passport-jwt');
const config = require('config').get('jwt');

const models = require('../../models');
const AppError = require('../../common/error/error');
const { httpStatus } = require('../../common/error/http-status');

// const pathToKey = path.join(__dirname, '..', '..', '..', 'id.ecdsa.pem');
// const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const { ExtractJwt } = passportJWT;
const { Strategy } = passportJWT;
const params = {
    secretOrKey: process.env.JWT_SECRET || config.jwtSecret,
    // algorithms: ['RS256'],
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = function () {
    /**
     * -------------- PASSPORT STRATEGY ----------------
     */

    const strategy = new Strategy(params, async (payload, done) => {
        try {
            const user = await models.user.scope('role').findByPk(payload.sub);

            if (user) {
                return done(null, {
                    id: user.id,
                    role: user.role.name,
                });
            }

            return done(null, false);
        } catch (err) {
            return done(err, false);
        }
    });

    passport.use(strategy);

    return {
        /**
         * -------------- PASSPORT INITIALIZE ----------------
         */

        initialize: function () {
            return passport.initialize();
        },

        /**
         * -------------- PASSPORT AUTHENTICATE MIDDLEWARES ----------------
         */

        authenticate: function (req, res, next) {
            return passport.authenticate(
                'jwt',
                config.session,
                (err, user, info) => {
                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        return next(
                            new AppError(
                                httpStatus.UNAUTHORIZED,
                                'Invalid Credentials.',
                                true,
                                'invalid.credentials',
                            ),
                        );
                    }

                    req.user = user;
                    return next();
                },
            )(req, res, next);
        },
    };
};
