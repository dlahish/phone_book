const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose   = require('mongoose');
const Person = require('./models/person');
mongoose.connect('mongodb://localhost/klarna');

const router = express.Router();

function calculateDateRange(searchValue) {
  var today = new Date().getTime() / 1000
  var dateBeforeBirthday = today - searchValue * 31556926 - 86400 - 31556926
  var dateAfterBirthday = today - searchValue * 31556926 - 86400
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
    var splitSearchValueString = []
    var splitSearchValueNumber = []
    // var dateRange = [-2208992400, 2524604400]
    var dateRange = [0, 0]
    console.log('dateRange ' + dateRange)
    splitSearchValue.map(function(section) {
      if (section === '') {
        console.log('space')
      } else if (isNaN(section)) {
        console.log('is a string - section - ' + section)
        const searchValueRegExp = new RegExp('^' + section, 'i')
        splitSearchValueString.push(searchValueRegExp)
      } else {
        console.log('is a number - section - ' + section)
        const searchValueParseInt = parseInt(section)
        dateRange = calculateDateRange(searchValueParseInt)
        splitSearchValueNumber.push(dateRange)
      }
    })

    console.log('numbers array - ' + splitSearchValueNumber)
    console.log('string array - ' + splitSearchValueString)
    console.log('dateRange 2 ' + dateRange)

    // if (aa>=65 && aa<=90 || aa>=97 && aa<=122) {
    //   console.log('is a letter!')
    //
    // }
    // const searchValueRegExp = new RegExp('^' + searchValue, 'i')
    // console.log(searchValueRegExp)
    // const dateRange = calculateDateRange(searchValue)


    // Person.find({name: searchValueRegExp}).skip(clientListLength).limit(10).exec(function(err, personName) {
    //   var finalResult = []
    //   if (err)
    //       res.send(err);
    //   finalResult = personName
    //   if (searchValueParseInt) {
    //       Person.find({ $and: [ {birthday: { $gt: dateRange[0] } }, {birthday: { $lte: dateRange[1] } } ]}).skip(clientListLength).limit(10).exec(function(err, personAge) {
    //         if (err)
    //             res.send(err);
    //         finalResult = finalResult.concat(personAge)
    //         // console.log(personAge)
    //         res.json(finalResult)
    //       })
    //   } else {
    //       res.json(finalResult);
    //   }
    // });

    if (dateRange[0] === 0) {
        Person
          // .find({ $or: [
          //   { name: { $in: splitSearchValueString } },
          //   { $and: [ {birthday: { $gt: dateRange[0] } }, {birthday: { $lte: dateRange[1] } } ]}
          // ] } )
          .find({name: { $in: splitSearchValueString } })
          .skip(clientListLength)
          .limit(10)
          .exec(function(err, personName) {
            if (err)
              res.send(err);
            console.log('SEARCH 111---')
            res.json(personName)
          });
    } else if (splitSearchValueString.length === 0) {
        Person
          .find({ $and: [
            { birthday: { $gt: dateRange[0] } },
            { birthday: { $lte: dateRange[1] } }
          ] } )
          .skip(clientListLength)
          .limit(10)
          .exec(function(err, personName) {
            if (err)
              res.send(err);
            console.log('SEARCH 111---')
            res.json(personName)
          });
    } else {
        Person
          .find({ $and: [
            { name: { $in: splitSearchValueString } },
            { birthday: { $gt: dateRange[0] } },
            { birthday: { $lte: dateRange[1] } }
          ] } )
          // .find({name: { $in: splitSearchValueString } })
          .skip(clientListLength)
          .limit(10)
          .exec(function(err, personName) {
            if (err)
              res.send(err);
            console.log('SEARCH 222---')
            res.json(personName)
          });
    }
  });

router.route('/new')
  .get(function(req, res) {

  });



app.use('/', router);

app.listen(port);
console.log('Server listening on port ' + port);
