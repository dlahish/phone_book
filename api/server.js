const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require('./models/person')
mongoose.Promise = require('bluebird');
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost:klarna/klarna');

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
      var newPerson = new Person({
       	"id" : "b01a0e23da718aaaaa9311b8b2dfb069",
       	"name" : "Nadav Lachish",
       	"phone" : "5248-469641",
       	"avatar_image" : "images/b0/b01a0e23da718a08989311b8b2dfb069.png",
       	"avatar_origin" : "https://robohash.org/b01a0e23da718a08989311b8b2dfb069.png?size=400x400&set=set1",
       	"email" : "carolina_ankunding@blickmckenzie.io",
       	"quote" : "Aren't you a little short for a Stormtrooper?",
       	"chuck" : "Chuck Norris burst the dot com bubble.",
       	"birthday" : 443138400,
       	"address" : {
       		"city" : "Avsås",
       		"street" : "Larssons Gata 4",
       		"country" : "Norrland"
       	}
      });
      newPerson.save(function(err) {
        if (err) { console.log(err) }
        res.send('person saved');
      });
  });



app.use('/', router);

app.listen(port);
console.log('Server listening on port ' + port);
