const QRCode = require('qrcode');
const path = require('path');

module.exports.createQrCode = function (filename, data) {
    QRCode.toFile(
        path.join(__dirname, '..', '..', '..', 'public', `${filename}.png`),
        [{ data: data, mode: 'byte' }],
    );

    return `${
        process.env.SERVER_HOST || 'http://localhost:3000'
    }/public/${filename}.png`;
};
