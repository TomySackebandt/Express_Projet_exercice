import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { indexRouter } from './routes/index.js';
import { usersRouter } from './routes/users.js';
import { chatRouter } from './routes/chat.js';
import { apiRestRouter } from './routes/api_rest.js';
import { graphqlRouter } from './routes/graphql.js';

import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash';

import session from 'express-session';

var app = express();

//session middleware
app.use(session({
  secret: "thisismysecrctekey",
  saveUninitialized: true,
  resave: false
}));
//body parser

//graphql
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import resolvers from "./GraphQL/resolvers.js";//les resolver dans ce fichier
import typeDefs from "./GraphQL/typeDefinition.js";//la definition des types
import root from "./GraphQL/root.js";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)

// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRouter);
app.use('/api_rest', apiRestRouter);
app.use('/graphql', graphqlRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export { app as app };