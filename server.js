const path = require('path');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { fileLoader, mergeResolvers, mergeTypes } = require('merge-graphql-schemas');

const configs = require('./config/config');
const models = require('./models');

// merge graphql resolvers and types
const typesArray = fileLoader(path.join(__dirname, './schema'));
const typeDefs = mergeTypes(typesArray);
const resolversArray = fileLoader(path.join(__dirname, './resolvers'));
const resolvers = mergeResolvers(resolversArray);

// init express server
const app = express();

// connect to mongoDb
mongoose.connect(
    configs.mongodbURI,
    () => {
        console.log('connected to the mLab');
    }
);

// require passport configuration
require('./config/passport')(passport);

// add middlewares
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(passport.initialize());

// create apollo server and integrate with existing express server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: req => {
        return {
            models
        };
    }
});
server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('listening on the port', PORT);
});
