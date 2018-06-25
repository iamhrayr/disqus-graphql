const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log('listening on the port', PORT);
});
