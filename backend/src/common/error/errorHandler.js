class ErrorHandler {
    async handleError(err) {
        console.log(err);
        await this.sendMailToAdminIfCritical(err);
    }

    isTrustedError(error) {
        return error.isOperational;
    }

    async sendMailToAdminIfCritical(err) {
        // TODO
        return 0;
    }
}

module.exports = new ErrorHandler();
