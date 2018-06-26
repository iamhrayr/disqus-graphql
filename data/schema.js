const { gql } = require('apollo-server');

module.exports = gql`
    ###############
    ### Queries ###
    ###############
    type Query {
        id: Int
        topics: [Topic]
        topic(id: ID): Topic
        users: [User]
    }
    type User {
        id: Int
        email: String
        topics: [Topic]
    }
    type Topic {
        id: Int
        title: String
        text: String
        author: User
        comments: [Comment]
    }
    type Comment {
        id: Int
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
