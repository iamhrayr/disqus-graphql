import gql from 'graphql-tag';

export const loginMutation = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

export const signupMutation = gql`
    mutation signup($email: String!, $password: String!) {
        signup(email: $email, password: $password) {
            id
        }
    }
`;

export const addCommentMutation = gql`
    mutation addComment($text: String!, $topic: ID!) {
        addComment(text: $text, topic: $topic) {
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
    }
`;

export const deleteTopicMutation = gql`
    mutation deleteTopic($id: ID!) {
        deleteTopic(id: $id) {
            id
            title
        }
    }
`;

export const createTopicMutation = gql`
    mutation createTopic($title: String!, $text: String!) {
        createTopic(title: $title, text: $text) {
            id
            title
            text
        }
    }
`;