import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state'
import { ApolloLink } from 'apollo-link';

const cache = new InMemoryCache({
    dataIdFromObject: object => object.key || null
});

const defaultState = {
    auth: {
        __typename: 'Auth',
        isAuth: localStorage.token ? true : false
    }
}

const stateLink = withClientState({
    cache,
    defaults: defaultState,
    // resolvers
})

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
});

const client = new ApolloClient({
    link: ApolloLink.from([
        stateLink,
        authLink.concat(httpLink)
    ]),
    cache
});

export default client;