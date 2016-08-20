const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose   = require('mongoose');
const Person = require('./models/person');
const personSearch = require('./models/personSearch')
mongoose.connect('mongodb://localhost/klarna');

const router = express.Router();

function calculateDateRange(searchValue) {
  var today = new Date().getTime() / 1000
  var dateBeforeBirthday = today - searchValue * 31556926 - 86400 - 31556926
  var dateAfterBirthday = today - searchValue * 31556926 - 86400
  return [dateBeforeBirthday, dateAfterBirthday]
}

function parsePhoneFormat(searchValue, shouldAddHyphen) {
  var phone = searchValue.toString()
  var phoneRegExp
  console.log('shouldAddHyphen - ' + shouldAddHyphen)
  if (shouldAddHyphen) {
    var phone1 = phone.slice(0,4)
    var phone2 = phone.slice(5)
    console.log('phone - ' + phone)
    console.log('phone1 - ' + phone1)
    console.log('phone2 - ' + phone2)
    phoneRegExp = new RegExp('(^' + phone1 + '-)(' + phone2 + ')')
    return phoneRegExp
  }
  console.log('PHONE - ' + phone)
  phoneRegExp = new RegExp('^' + phone)
  return phoneRegExp
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
    var splitedSearchValue = searchValue.split(" ")
    console.log(splitedSearchValue)
    var stringValue = ''
    var stringValueRegExp = ''
    var dateRange = [0, 0]
    var searchPhoneNumber, numberValueParseInt

    splitedSearchValue.map(function(section) {
      if (section === '') {
          console.log('space')
      } else if (isNaN(section)) {
          console.log('is a string - section - ' + section)
          if (section.charAt(4) === '-') {
              console.log('is a string (phone) - section - ' + section)
              searchPhoneNumber = parsePhoneFormat(section, true)
          } else {
              if (stringValue.length === 0) {
                stringValue = section
              } else {
                stringValue = stringValue + ' ' + section
              }
              stringValueRegExp = new RegExp('^' + stringValue, 'i')
          }
      } else {
          console.log('is a number - section - ' + section)
          numberValueParseInt = parseInt(section)
          if (numberValueParseInt < 100 && dateRange[0] === 0) {
              dateRange = calculateDateRange(numberValueParseInt)
          } else if (section.length >= 4 && section.charCodeAt(3) >= 48 && section.charCodeAt(3) <= 57) {
              console.log('is a string (phone) - section (add)- ' + section)
              section = section.slice(0,4) + '-' + section.slice(4)
              searchPhoneNumber = parsePhoneFormat(section, false)
          } else {
              searchPhoneNumber = parsePhoneFormat(numberValueParseInt, false)
          }
      }
    })
    console.log('--- CONSOLE LOG ---')
    console.log('stringValue - ' + stringValue)
    console.log('stringValueRegExp - ' + stringValueRegExp)
    console.log('searchPhoneNumber - ' + searchPhoneNumber)
    console.log('dateRange 2 ' + dateRange)

    if (stringValue.length > 0 && dateRange[0] !== 0 && searchPhoneNumber) {
      console.log('--- SEARCH FOR NAME & AGE & PHONE')
      //search name & age & phone
      personSearch('name&age&phone', res, stringValueRegExp, clientListLength, searchPhoneNumber, dateRange)
    } else if (stringValue.length > 0 && dateRange[0] !== 0) {
      console.log('--- SEARCH FOR NAME & AGE')
      //search only names and age
      personSearch('name&age', res, stringValueRegExp, clientListLength, null, dateRange)
    } else if (stringValue.length > 0 && searchPhoneNumber && dateRange[0] === 0) {
      console.log('--- SEARCH FOR NAME & PHONE NUMBER')
      //search name & phone
      personSearch('name&phone', res, stringValueRegExp, clientListLength, searchPhoneNumber)
    } else if (stringValue.length === 0 && dateRange[0] !== 0 && searchPhoneNumber) {
      console.log('--- SEARCH FOR AGE & PHONE')
      //search age & phone
      personSearch('age&phone', res, null, clientListLength, searchPhoneNumber, dateRange)
    } else if (stringValue.length > 0) {
      console.log('--- SEARCH FOR NAME')
      //search name only
      personSearch('name', res, stringValueRegExp, clientListLength)
    } else if (dateRange[0] !== 0) {
      console.log('--- SEARCH FOR BIRTHDAY')
      //search birthday only
      personSearch('birthday', res, stringValueRegExp, clientListLength, null, dateRange)
    } else if (searchPhoneNumber) {
      console.log('--- SEARCH FOR PHONE NUMBER')
      //search phone only
      personSearch('phone', res, stringValueRegExp, clientListLength, searchPhoneNumber)
    }
  });

router.route('/new')
  .get(function(req, res) {

  });



app.use('/', router);

app.listen(port);
console.log('Server listening on port ' + port);
