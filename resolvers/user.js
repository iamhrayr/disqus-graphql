const AuthService = require('../services/auth');

module.exports = {
    Query: {
        users: (root, args, { models }) => {
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
            return AuthService.signup({email, password, models});
        },
        login: (root, { email, password }, { models }) => {
            return AuthService.login({email, password, models});
        }
    }
};
