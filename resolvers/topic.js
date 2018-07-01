module.exports = {
    Query: {
        topics: (root, args, { models, req }) => {
            return models.Topic.find();
        },
        topic: (root, args, { models }) => {
            return models.Topic.findOne({
                _id: args.id
            });
        },
        myTopics: (root, args, { models, req }) => {
            return models.Topic.find({
                author: req.user._id
            })
        }
    },

    Topic: {
        comments: (root, args, { models }) => {
            return models.Comment.find({
                topic: root.id
            });
        },
        author: (root, args, { models }) => {
            return models.User.findOne({
                _id: root.author
            });
        }
    },

    Mutation: {
        createTopic: (root, { title, text }, { req, models }) => {
            if (!req.user) {
                const error = new Error('Authentication required');
                error.statusCode = 401;
                return error;
            }
            return new models.Topic({
                title,
                text,
                author: req.user._id
            }).save();
        },
        editTopic: (root, { id, text, title }, { req, models }) => {
            if (!req.user) {
                const error = new Error('Authentication required');
                error.statusCode = 401;
                return error;
            }
            return models.Topic.findOne({_id: id})
                .then(topic => {
                    if (topic._id !== id) {
                        return new Error('You are not allowed to edit this topic');
                    }
                    text && (topic.text = text); 
                    title && (topic.title = title);
                    return topic.save();
                })
        },
        deleteTopic: (root, { id }, { req, models }) => {
            if (!req.user) {
                const error = new Error('Authentication required');
                error.statusCode = 401;
                return error;
            }
            models.Topic.findOne({_id: id})
                .then(topic => {
                    if (topic.id !== id) {
                        return new Error('You are not allowed to delete this topic');
                    }
                    return topic.remove().then(() => {
                        models.Comment.deleteMany({ topic: id });
                    }); 
                })
        },
    }
};
