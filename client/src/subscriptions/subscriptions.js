import gql from 'graphql-tag';

export const commentAdded = gql`
    subscription CommentAdded($id: ID) {
        commentAdded(topicId: $id) {
            id
            text
            author {
                email
            }
        }
    }
`;
