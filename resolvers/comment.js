module.exports = {
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
