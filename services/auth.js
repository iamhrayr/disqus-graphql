const jwt = require('jsonwebtoken');
const {secret} = require('../config/config');

const login = ({email, password, models}) => {
    return new Promise((resolve, reject) => {
        models.User.findOne({email}).then(user => {
            user.comparePassword(password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const payload = {id: user._id, email}
                    const token = jwt.sign(payload, secret);
                    resolve({token});
                }
            });
        })
    });
};


const signup = ({email, password, models}) => {
    return new models.User({email,password}).save();
}



module.exports = {
    login,
    signup
}