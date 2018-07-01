const { gql } = require('apollo-server-express');

module.exports = gql`
    type Comment {
        id: ID
        author: User
        text: String
        createdAt: Date
    }

    type Mutation {
        addComment(text: String, topic: ID): Comment
    }
`;
