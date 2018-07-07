const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

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
            pubsub.publish('COMMENT_ADDED', { commentAdded: { text, topic } });
            return new models.Comment({
                text,
                topic,
                author: req.user._id
            }).save();
        }
    },
    Subscription: {
        commentAdded: {
            subscribe: () => pubsub.asyncIterator(['COMMENT_ADDED']),
        }
    }
};
