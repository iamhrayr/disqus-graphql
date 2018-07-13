const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

module.exports = {
    Comment: {
        author: (root, args, { models }) => {
            models.User.findOne({
                _id: root.author
            }).then(users => {
                console.log(users)
            })
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
            }).save().then(comment => {
                console.log(comment)
                pubsub.publish('COMMENT_ADDED', { commentAdded: comment });
            });
        }
    },
    Subscription: {
        commentAdded: {
            subscribe: () => pubsub.asyncIterator('COMMENT_ADDED'),
            // resolve: (payload, args, context, info) => {  // Without this it does not work neither
            //     console.log('payload', payload);
            //     console.log('args', args);
            //     console.log('context', context);
            //     // console.log('info', info);
            //     return payload.commentAdded;
            // },
        }
    }
};
