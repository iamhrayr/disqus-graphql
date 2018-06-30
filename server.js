const path = require('path');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server-express');
const { fileLoader, mergeResolvers,mergeTypes } = require('merge-graphql-schemas');

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
mongoose.connect(configs.mongodbURI,() => {
    console.log('connected to the mLab');
});

// require passport configuration
require('./config/passport')(passport);

// add middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/graphql', (req, res, next) => {
    passport.authenticate('jwt', (err, user) => {
        if (err) return next(err);
        req.login(user, {session: false}, err => {
            if (err) return next(err);
            next();
        });
    })(req);
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        return {
            req,
            models
        };
    }
});

server.applyMiddleware({app, path: '/graphql'});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('listening on the port', PORT);
});