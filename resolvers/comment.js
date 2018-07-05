module.exports = {
    Comment: {
        author: (root, args, { models }) => {
            return models.User.findOne({
                _id: root.author
            });
        }
    },
    Mutation: {
        addComment: (root, { text, topic }, { req, models }) => {
            if (!req.user) {
                const error = new Error('Authentication required');
                error.statusCode = 401;
                return error;
            }
            return new models.Comment({
                text,
                topic,
                author: req.user._id
            }).save();
        }
    }
};
