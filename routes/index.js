import express from 'express';
var router = express.Router();
import fs from 'node:fs';
import session from 'express-session';

/* GET home page. */
router.get('/', function(req, res, next) {
  //récuperation de la session
  var sessions = req.session
  //creation de la variable message
  let message = ""
  //savoir si on renvoie un message si on est admin
  if (sessions.isAdmin){ message="Bienvenue "+sessions.name}else{ message=""};
  res.render('index', { title: 'Home', admin: sessions.isAdmin, message: message});
});

/*GET page about*/
router.get('/about/', function(req, res, next) {
  //récuperation de la session
  var sessions = req.session
  res.render('about', { title: 'About' , admin: sessions.isAdmin});
});

/*GET page contact*/
router.get('/contact/', function(req, res, next) {
  //récuperation de la session
  var sessions = req.session
  //creation de la variable message
  let message = ""
  //savoir si on renvoie un message si on est admin
  if (sessions.isAdmin){ message="Bienvenue "+sessions.name}else{ message=""};
  res.render('index', { title: 'Contact' , admin: sessions.isAdmin, message: message});
});

router.get('/chapter/:chap_nb', function(req,res,next){
  //récuperation de la session
  var sessions = req.session
  res.render('chapter', {title: "chaptitre", chap_nb: req.params.chap_nb, admin: sessions.isAdmin});
})

router.get('/download', function (req, res) {
  var sessions = req.session
  txt_content = ""

  var date_now = new Date().toISOString().replace(/T/, '_').replace(/\..+/, '')

  if(sessions.name){txt_content=sessions.name};
  var filename = __dirname+"/../public/"+date_now+".txt"
  var writeStream = fs.createWriteStream(filename);
  writeStream.write("Bonjour "+txt_content+" !\n");
  writeStream.write(date_now);
  writeStream.end(function (err){
    var options = {
      root: __dirname+'/../public',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }
    filename = filename.split('/').at(-1)
    // var fileName = 'file.pdf';
    res.sendFile(filename, options, function (err) {
        if (err) {
          console.log(err);
        }
    });
  });
});

export {router as indexRouter};