var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login/', function(req, res, next) {
  //récuperation de la session
    session = req.session
  res.render('login', { title: 'Login', error: '', admin: session.isAdmin});
});

/*POST page auth*/
router.post('/auth/', function(req, res, next) {
  //récuperation de la session
  session=req.session;
  //récuperation des login envoyer
  var user = {
    name: req.body.name,
    password: req.body.password
  }
  //si c'est le bon login
  if(user.name === "admin" && user.password === "admin"){
    session.isAdmin=true;
    session.name=req.body.name;
    if(session.isAdmin){
      console.log(session.userid)
    }
    //On envoie l'utilisateur vers la page d'acceuil
    res.redirect('/');
  }
  else//si le mot de passe n'est pas bon
  {
    //On renvoie l'utilisateur vers l apage de login avec un message d'erreur
    res.render('login', { title: 'Login', error: "Mauvais login", admin: session.isAdmin});
  }
});

router.get('/logout',(req,res) => {
  //récuperation de la session
  session = req.session
  session.destroy();
  res.redirect('/');
});

module.exports = router;
