const { gql } = require('apollo-server-express');

module.exports = gql`
    type Query {
        topics: [Topic]
        topic(id: ID): Topic
    }
    type Topic {
        id: ID
        title: String
        text: String
        author: User
        comments: [Comment]
    }
`;
