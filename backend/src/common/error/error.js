class AppError extends Error {
    constructor(statusCode, message, isOperation, type = undefined) {
        super();

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppError);
        }

        this.statusCode = statusCode;
        this.message = message;
        this.isOperation = isOperation;
        this.type = type;
    }
}

module.exports = AppError;

/* Lỗi: Type

permisstion denied: permission.denied
Invalid Credentials: invalid.credentials
This account hasn’t been activated yet.: unactivate
The old password you have entered is incorrect: password.incorrect
This user does not exist: user.not.exist
Password already used: password.used
stdId already used: stdId.used
username already used: username.used
Password too weak: password.weak */
