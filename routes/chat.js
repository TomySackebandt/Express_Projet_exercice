import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //récuperation de la session
  var sessions = req.session
  res.render('chat', { title: 'Chat', error: '', admin: sessions.isAdmin});
});

export {router as chatRouter};