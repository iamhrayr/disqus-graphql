import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloLink, split, concat } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state'
import { getMainDefinition } from 'apollo-utilities';


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

const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
        reconnect: true,
        connectionParams: {
            authToken: localStorage.token
        }
    }
});

const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,    
    httpLink
);

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
        authLink.concat(link)
    ]),
    cache
});

export default client;