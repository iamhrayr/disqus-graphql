const { gql } = require('apollo-server-express');

module.exports = gql`
    type Query {
        users: [User]
        me: User
    }
    type User {
        id: ID
        email: String
        firstName: String
        lastName: String
        topics: [Topic]
    }
    type Auth {
        token: String
    }

    type Mutation {
        signup(email: String, password: String): User
        login(email: String, password: String): Auth
        createTopic(title: String, text: String, authorId: ID): Topic
    }
`;
