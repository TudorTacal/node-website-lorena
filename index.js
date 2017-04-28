var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (request, response) =>  {
  response.render('index');
});

app.get('/workouts', function(request, response) {
  response.render('workouts');
});

app.get('/nutrition', function(request, response){
  response.render('nutrition');
});

app.get('/contacts', function(request, response){
  response.render('contacts');
});

app.get('/introduceContentOnYourWebsite', function(request, response){
  response.render('content.ejs');
});

app.post('/contacts', jsonParser, function (req, res) {
  var mailOpts, smtpTrans;

  smtpTrans = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: "lorenatacal@gmail.com",
          pass: "Imortality1987!"
      }
  });

  mailOpts = {
      from: req.body.name + ' &lt;' + req.body.email + '&gt;',
      to: 'lorenatacal@gmail.com',
      subject: 'Mail from your Website',
      text: req.body.message
  };

  smtpTrans.sendMail(mailOpts, function (error, response) {
      if (error) {
          console.log(error);
          console.log('Not sent');
          res.render('contacts', { title: 'Lorena Personal Trainer - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contacts' })
      }
      else {
          console.log('sent');
          res.render('contacts', { title: 'Lorena Personal Trainer - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contacts' })
      }
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
