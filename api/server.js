const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose   = require('mongoose');
const Person = require('./models/person');
mongoose.connect('mongodb://localhost/klarna');

const router = express.Router();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

router.use(function(req, res, next) {

    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/people')
  .post(function(req, res) {
    console.log('people post')
    // const searchValue = req.body.searchValue
    const searchValue = new RegExp('^' + req.body.searchValue, 'i')
    console.log(searchValue)
    Person.find({name: searchValue}, function(err, person) {
        if (err)
            res.send(err);
        console.log(person.length);
        res.json(person);
    });
  });

router.route('/new')
  .get(function(req, res) {

  });



app.use('/', router);

app.listen(port);
console.log('Server listening on port ' + port);
