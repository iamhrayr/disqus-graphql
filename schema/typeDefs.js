const { gql } = require('apollo-server');

module.exports = gql`
    ###############
    ### Queries ###
    ###############
    type Query {
        topics: [Topic]
        topic(id: ID): Topic
        users: [User]
    }
    type User {
        email: String
        topics: [Topic]
    }
    type Topic {
        title: String
        text: String
        author: User
        comments: [Comment]
    }
    type Comment {
        author: User
        text: String
        topic: Topic
    }

    #################
    ### Mutations ###
    #################
    type Mutation {
        createUser(email: String, password: String): User
        createTopic(title: String, text: String, authorId: ID): Topic
    }
`;
