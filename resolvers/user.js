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
        createUser: (root, args, { models }) => {
            return new models.User({
                email: args.email,
                password: args.password
            }).save();
        }
    }
};
