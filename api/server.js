const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require('./models/person')

const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/klarna');

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/people')
  .get(function(req, res) {
      Person.find({name: 'Per Åslund', phone: '4600-18228'}, function(err, person) {
          if (err)
              res.send(err);
          console.log(person);
          res.json(person);
      });
  });

router.route('/new')
  .get(function(req, res) {

  });



app.use('/', router);

app.listen(port);
console.log('Server listening on port ' + port);
