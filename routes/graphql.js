import express from 'express';
var router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
});

export { router as graphqlRouter };