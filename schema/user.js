const { gql } = require('apollo-server-express');

module.exports = gql`
    type Query {
        users: [User]
    }
    type User {
        id: ID
        email: String
        firstName: String
        lastName: String
        topics: [Topic]
    }

    type Mutation {
        createUser(email: String, password: String): User
        createTopic(title: String, text: String, authorId: ID): Topic
    }
`;
