// Fake data
const topics = [
    {
        id: '1',
        title: 'My very first topic',
        text: 'Lorem ipsum dolor sit amet.',
        authorId: '1'
    },
    {
        id: '2',
        title: 'Something else',
        text: 'Sit amet lorem ipsum dolor.',
        authorId: '2'
    }
];

const users = [
    {
        id: '1',
        email: 'test@mail.com',
        password: '123456'
    },
    {
        id: '2',
        email: 'otherone@mail.com',
        password: '123456'
    }
];

const comments = [
    {
        authorId: '1',
        text: 'The awesome comment',
        topicId: '2'
    },
    {
        authorId: '1',
        text: 'Another comment',
        topicId: '1'
    },
    {
        authorId: '2',
        text: 'What the hell?',
        topicId: '2'
    }
];

module.exports = {
    Query: {
        topics: (root, args) => {
            return topics;
        },
        topic: (root, args) => {
            return topics.find(topic => {
                return topic.id === args.id;
            });
        },
        users: (root, args, context) => {
            console.log('context', context);
            return users;
        }
    },

    User: {
        topics: (root, args) => {
            return topics.filter(topic => {
                return (topic.authorId = root.id);
            });
        }
    },

    Topic: {
        comments: (root, args) => {
            return comments.filter(comment => {
                return (comment.topicId = root.id);
            });
        },
        author: (root, args) => {
            return users.find(user => {
                return user.id === root.authorId;
            });
        }
    },

    Mutation: {
        createUser: (root, args) => {
            const newUser = {
                email: args.email,
                password: args.password
            };
            users.push(newUser);
            return newUser;
        }
    }
};
