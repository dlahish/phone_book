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
    function calculateAge(ageIn) { // birthday is a date
      console.log('agein - '+ageIn)
      const todayInEpoch = (new Date).getTime()
      const todayInYearsEpoch = todayInEpoch / 31556926
      const as = ageIn * 31556926
      const aw = todayInYearsEpoch - as
      return todayInYearsEpoch - aw
    }
    const clientListLength = req.body.listLength
    const searchValue = req.body.searchValue
    console.log('clientListLength - ' + clientListLength)
    const aa = searchValue.charCodeAt()
    console.log(aa)
    if (aa>=65 && aa<=90 || aa>=97 && aa<=122) { console.log('is a letter!')}
    const searchValueRegExp = new RegExp('^' + searchValue, 'i')
    console.log(searchValueRegExp)
    const age = calculateAge(searchValue)
    console.log(age)
    // Person.find( { $or: [ { name: searchValueRegExp }, { birthday: age } ] } ).skip(clientListLength).limit(10).exec(function(err, person) {
    Person.find({name: searchValueRegExp}).skip(clientListLength).limit(10).exec(function(err, person) {
        if (err)
            res.send(err);
        res.json(person);
    });
  });

router.route('/new')
  .get(function(req, res) {

  });



app.use('/', router);

app.listen(port);
console.log('Server listening on port ' + port);
