//Lib
import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { makeExecutableSchema } from 'graphql-tools';
import session from 'express-session';

//Router
import { indexRouter } from './routes/index.js';
import { usersRouter } from './routes/users.js';
import { chatRouter } from './routes/chat.js';
import { apiRestRouter } from './routes/api_rest.js';
import { graphqlRouter } from './routes/graphql.js';

//Swagger-ui
import swaggerUi  from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mon api REST',
      version: '1.0.0',
      description: 'Ceci est une description de mon API REST',
    },
    tags: [
      {
        name: 'artiste',
        description: "Toute les routes pour la gestion d'artiste"
      },
      {
        name: 'style',
        description: "Toute les routes pour la gestion des style"
      }
    ]
  },
  apis: ['./routes/*.js'], // Replace with the path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

var app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//session middleware
app.use(session({
  secret: "thisismysecrctekey",
  saveUninitialized: true,
  resave: false
}));
//body parser

// import graphql
import { graphqlHTTP } from "express-graphql";
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

// Difinition of the different routes
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