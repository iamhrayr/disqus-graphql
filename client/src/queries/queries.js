import gql from 'graphql-tag';

export const topicQuery = gql`
    query Topic($id: ID) {
        topic(id: $id) {
            id
            title
            text
            author {
                email
                firstName
                lastName
            }
            comments {
                id
                text
                author {
                    id
                    email
                    firstName
                    lastName
                }
                createdAt
            }
            createdAt
        }
    }
`;

export const myTopicsQuery = gql`
    {
        myTopics {
            id
            title
            text
            createdAt
        }
    }
`;

export const topicsQuery = gql`
    {
        topics {
            id
            title
            text
            createdAt
        }
    }
`;