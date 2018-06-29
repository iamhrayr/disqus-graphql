module.exports = {
    Query: {
        topics: (root, args, { models, req }) => {
            console.log(req.user);
            return models.Topic.find();
        },
        topic: (root, args, { models }) => {
            return models.Topic.findOne({
                _id: args.id
            });
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
    }
};
