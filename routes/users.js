import express from 'express';
var router = express.Router();
import session from 'express-session'

/* GET home page. */
router.get('/login/', function(req, res, next) {
  //récuperation de la session
  var sessions = req.session
  res.render('login', { title: 'Login', error: '', admin: sessions.isAdmin});
});

/*POST page auth*/
router.post('/auth/', function(req, res, next) {
  //récuperation de la session
  var sessions=req.session;
  //récuperation des login envoyer
  var user = {
    name: req.body.name,
    password: req.body.password
  }
  //si c'est le bon login
  if(user.name === "admin" && user.password === "admin"){
    sessions.isAdmin=true;
    sessions.name=req.body.name;
    if(sessions.isAdmin){
      console.log(sessions.userid)
    }
    //On envoie l'utilisateur vers la page d'acceuil
    res.redirect('/');
  }
  else//si le mot de passe n'est pas bon
  {
    //On renvoie l'utilisateur vers l apage de login avec un message d'erreur
    res.render('login', { title: 'Login', error: "Mauvais login", admin: sessions.isAdmin});
  }
});

router.get('/logout',(req,res) => {
  //récuperation de la session
  var sessions = req.session
  sessions.destroy();
  res.redirect('/');
});

export {router as usersRouter};