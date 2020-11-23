const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const config = require('config').get('jwt');

// const pathToKey = path.join(__dirname, '..', '..', '..', 'id.ecdsa');
// const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 * @param {*} password - The plain text password
 * @param {*} hash - The hash include salt stored in the database
 *
 * This function uses bcrypt library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
function validPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

/**
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt with hash are stored for security
 */
function genPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
}

/**
 * @param {*} userId - Set the JWT `sub` payload property to the user ID
 */
function issueJWT(userId) {
    const expiresIn = config.expiresIn || '7d';

    const payload = {
        sub: userId,
    };

    const signedToken = jsonwebtoken.sign(
        payload,
        process.env.JWT_SECRET || config.jwtSecret,
        {
            expiresIn: expiresIn,
            // algorithm: 'RS256',
        },
    );

    return {
        token: signedToken,
        expires: expiresIn,
    };
}

/**
 * @param  {} {returncrypto.randomBytes(10
 * @param  {} .toString('hex'
 */
function generateResetPasswordToken() {
    return crypto.randomBytes(10).toString('hex');
}

// !PLEASE RUN generate-key-pair.sh instead
/**
 * This module will generate a public and private keypair and save to current directory
 *
 * Make sure to keep the private key private after generated!
 */
function genKeyPair() {
    try {
        // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
        const keyPair = crypto.generateKeyPairSync('ec', {
            namedCurve: 'secp256k1', // Options
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            },
        });

        // Create the public key file
        fs.writeFileSync(
            `${__dirname}/../../../id_rsa_pub.pem`,
            keyPair.publicKey,
            {
                flag: 'wx',
            },
        );

        // Create the private key file
        fs.writeFileSync(
            `${__dirname}/../../../id_rsa_priv.pem`,
            keyPair.privateKey,
            {
                flag: 'wx',
            },
        );
    } catch (err) {
        if (err.code === 'EEXIST') console.log('Key pair already exist.');
        else console.log(err);
    }
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
module.exports.generateResetPasswordToken = generateResetPasswordToken;
