const { ApolloServer } = require('apollo-server');
const schema = require('./data/schema');
const resolvers = require('./data/resolvers');

const server = new ApolloServer({ schema, resolvers });

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log('listening on the port', PORT);
});
