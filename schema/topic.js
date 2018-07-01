const { gql } = require('apollo-server-express');

module.exports = gql`
    type Query {
        topics: [Topic]
        topic(id: ID): Topic
        myTopics: [Topic]
    }
    type Topic {
        id: ID
        title: String
        text: String
        author: User
        comments: [Comment]
        createdAt: Date
    }
    type Mutation {
        createTopic(title: String, text: String): Topic
        editTopic(id: ID, title: String, text: String): Topic
        deleteTopic(id: ID): Topic
    }
`;
