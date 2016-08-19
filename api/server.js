const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose   = require('mongoose');
const Person = require('./models/person');
mongoose.connect('mongodb://localhost/klarna');

const router = express.Router();

function calculateAge(searchValue) {
  var today = new Date().getTime() / 1000
  var dateBeforeBirthday = today - searchValue * 31556926 - 86400 - 31556926
  var dateAfterBirthday = today - searchValue * 31556926 - 86400
  // console.log('dateOnBornYear - ' + birthdayDateBefore) //less then bd
  // var thisYear = new Date().getFullYear()
  // var birthdayYear = thisYear - searchValue
  // const birthdayDate = new Date(birthdayYear, 0, 1).getTime() / 1000
  return [dateBeforeBirthday, dateAfterBirthday]
}

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
    const clientListLength = req.body.listLength
    const searchValue = req.body.searchValue
    var splitSearchValue = searchValue.split(" ")
    console.log(splitSearchValue)
    const aa = searchValue.charCodeAt()
    console.log('type of searchValue - ' + typeof searchValue)
    const searchValueParseInt = parseInt(searchValue)
    console.log(searchValueParseInt)
    console.log('type of searchValueParseInt - '+ typeof searchValueParseInt)
    if (aa>=65 && aa<=90 || aa>=97 && aa<=122) { console.log('is a letter!')}
    const searchValueRegExp = new RegExp('^' + searchValue, 'i')
    console.log(searchValueRegExp)
    const dateRange = calculateAge(searchValue)
    // const agePlusAYear = age + 31556926
    // console.log(age)
    // console.log(agePlusAYear)
    // Person.find( { $or: [ { name: searchValueRegExp }, {birthday: { $lte: age } } ] } ).skip(clientListLength).limit(10).exec(function(err, person) {
    Person.find({name: searchValueRegExp}).skip(clientListLength).limit(10).exec(function(err, personName) {
      var finalResult = []
      if (err)
          res.send(err);
      finalResult = personName
      if (searchValueParseInt) {
          Person.find({ $and: [ {birthday: { $gt: dateRange[0] } }, {birthday: { $lte: dateRange[1] } } ]}).skip(clientListLength).limit(10).exec(function(err, personAge) {
          // Person.find({birthday: { $gt: dateRange[0] } }).skip(clientListLength).limit(10).exec(function(err, personAge) {
            if (err)
                res.send(err);
            finalResult = finalResult.concat(personAge)
            // console.log(personAge)
            res.json(finalResult)
          })
      } else {
          res.json(finalResult);
      }


    });
  });

router.route('/new')
  .get(function(req, res) {

  });



app.use('/', router);

app.listen(port);
console.log('Server listening on port ' + port);
