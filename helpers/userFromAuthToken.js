const jwt = require('jsonwebtoken');
const { secret } = require('../config/config')

module.exports = (authToken) => {
    return jwt.verify(authToken, secret, (err, decoded) => {
        if (err) throw err;
        return decoded;
    });
}