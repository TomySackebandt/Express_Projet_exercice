import express from 'express';
var router = express.Router();
import session from 'express-session';

/* GET home page. */
router.get('/', function(req, res, next) {
  //récuperation de la session
  var sessions = req.session
  res.render('login', { title: 'Login', error: '', admin: sessions.isAdmin});
});

export {router as chatRouter};