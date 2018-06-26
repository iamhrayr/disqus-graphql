const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./data/schema');
const resolvers = require('./data/resolvers');

// init express server
const app = express();

// require passport configuration
require('./config/passport')(passport);

// add middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// create apollo server and integrate with existing express server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: req => {
        return;
        console.log(req);
    }
});
server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('listening on the port', PORT);
});
