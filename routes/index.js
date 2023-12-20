var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //récuperation de la session
  session = req.session
  //creation de la variable message
  let message = ""
  //savoir si on renvoie un message si on est admin
  if (session.isAdmin){ message="Bienvenue "+session.name}else{ message=""};
  res.render('index', { title: 'Home', admin: session.isAdmin, message: message});
});

/*GET page about*/
router.get('/about/', function(req, res, next) {
  //récuperation de la session
  session = req.session
  res.render('about', { title: 'About' , admin: session.isAdmin});
});

/*GET page contact*/
router.get('/contact/', function(req, res, next) {
  //récuperation de la session
  session = req.session
  //creation de la variable message
  let message = ""
  //savoir si on renvoie un message si on est admin
  if (session.isAdmin){ message="Bienvenue "+session.name}else{ message=""};
  res.render('index', { title: 'Contact' , admin: session.isAdmin, message: message});
});

router.get('/chapter/:chap_nb', function(req,res,next){
  //récuperation de la session
  session = req.session
  res.render('chapter', {title: "chaptitre", chap_nb: req.params.chap_nb, admin: session.isAdmin});
})

router.get('/download', function (req, res) {
  var options = {
    root: __dirname+ '/../public',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  var fileName = 'file.pdf';
  res.sendFile(fileName, options, function (err) {
      if (err) {
          next(err);
      }
  });
});

module.exports = router;
