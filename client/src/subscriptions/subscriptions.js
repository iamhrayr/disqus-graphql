import gql from 'graphql-tag';

export const commentAdded = gql`
    subscription {
        commentAdded {
            text
        }
    }
`;
