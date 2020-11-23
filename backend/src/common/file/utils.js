const path = require('path');
const fs = require('fs');

module.exports.deleteAllFile = async function () {
    try {
        const files = fs.readdirSync(
            path.join(__dirname, '..', '..', '..', 'public'),
        );

        files.forEach((file) => {
            // delete file Synchronously
            fs.unlinkSync(
                path.join(__dirname, '..', '..', '..', 'public', file),
            );
        });

        return { message: 'File deleted.' };
    } catch (err) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'No such file or directory',
            true,
        );
    }
};
