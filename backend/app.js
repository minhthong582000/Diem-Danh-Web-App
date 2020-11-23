const express = require('express');
const path = require('path');
const logger = require('morgan');
const config = require('config');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const db = require('./src/models');
const passportAuth = require('./src/api/auth/passport.strategy')();
const api = require('./src/api');
const swaggerDocs = require('./docs/index.json');
const errorManagement = require('./src/common/error/errorHandler');
const AppError = require('./src/common/error/error');
const { httpStatus } = require('./src/common/error/http-status');

/**
 * -------------- GENERAL SETUP -----------------
 */

require('dotenv').config();

// Configures and sync models to the database
db.sequelize.sync({ alter: true });

const app = express();

console.log(config.get('cors'));
app.use(cors(config.get('cors'))); // CORS
app.use(
    logger(
        ':method :url :status :remote-addr - :remote-user [:date[clf]] "HTTP/:http-version" :res[content-length] ":user-agent"',
    ),
); // Logger
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('Cache-Control', 'max-age=3000');

// This will initialize the passport object on every requests
app.use(passportAuth.initialize());

/**
 * -------------- ROUTES ----------------
 */

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Swagger documents
app.use('/api/v1', api); // Root

/**
 * -------------- ERROR HANDLER ----------------
 */

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(new AppError(httpStatus.NOT_FOUND, 'Not found.', true));
});

// Error handler
app.use(function (err, req, res, next) {
    let message;
    let status;
    let type;

    errorManagement.handleError(err);

    if (err.name === 'SequelizeUniqueConstraintError') {
        message = err.errors[0].message;
        status = httpStatus.UNPROCESSABLE_ENTITY;
        type = `${err.errors[0].path}.used`;
    } else {
        message = err.message;
        status =
            err.statusCode === undefined
                ? httpStatus.INTERNAL_SERVER_ERROR
                : err.statusCode;
        type = err.type;
    }

    res.status(status).json({
        statusCode: status,
        message,
        type,
    });
});

process.on('uncaughtException', (err) => {
    errorManagement.handleError(err);
    if (!errorManagement.isTrustedError(err)) process.exit(1);
});

module.exports = app;
