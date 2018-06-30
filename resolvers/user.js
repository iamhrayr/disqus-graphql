const AuthService = require('../services/auth');

module.exports = {
    Query: {
        users: async (root, args, { models, req }) => {
            console.log('req.user', req.user);
            return models.User.find();
        }
    },

    User: {
        topics: (root, args, { models }) => {
            return models.Topic.find({
                author: root.id
            });
        }
    },

    Mutation: {
        signup: (root, { email, password }, { models }) => {
            return AuthService.signup({ email, password, models });
        },
        login: (root, { email, password }, { models }) => {
            return AuthService.login({ email, password, models });
        }
    }
};
