const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose   = require('mongoose');
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
  var phone = searchValue.toString(),
      phoneRegExp
  if (shouldAddHyphen) {
    var phone1 = phone.slice(0,4)
    var phone2 = phone.slice(5)
    phoneRegExp = new RegExp('(^' + phone1 + '-)(' + phone2 + ')')
    return phoneRegExp
  }
  phoneRegExp = new RegExp('^' + phone)
  return phoneRegExp
}

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our api!' });
});

router.route('/people')
  .post(function(req, res) {
    const clientListLength = req.body.listLength
    const searchValue = req.body.searchValue
    var splitedSearchValue = searchValue.split(" "),
        stringValue = '',
        stringValueRegExp = '',
        dateRange = [0, 0],
        searchPhoneNumber,
        numberValueParseInt

    splitedSearchValue.map(function(section) {
      if (section === '') {
      } else if (isNaN(section)) {
          if (section.charAt(4) === '-') {
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
          numberValueParseInt = parseInt(section)
          if (numberValueParseInt < 100 && dateRange[0] === 0) {
              dateRange = calculateDateRange(numberValueParseInt)
          } else if (section.length >= 4 && section.charCodeAt(3) >= 48 && section.charCodeAt(3) <= 57) {
              section = section.slice(0,4) + '-' + section.slice(4)
              searchPhoneNumber = parsePhoneFormat(section, false)
          } else {
              searchPhoneNumber = parsePhoneFormat(numberValueParseInt, false)
          }
      }
    })

    if (stringValue.length > 0 && dateRange[0] !== 0 && searchPhoneNumber) {
      //search name & age & phone
      personSearch('name&age&phone', res, stringValueRegExp, clientListLength, searchPhoneNumber, dateRange)
    } else if (stringValue.length > 0 && dateRange[0] !== 0) {
      //search only names and age
      personSearch('name&age', res, stringValueRegExp, clientListLength, null, dateRange)
    } else if (stringValue.length > 0 && searchPhoneNumber && dateRange[0] === 0) {
      //search name & phone
      personSearch('name&phone', res, stringValueRegExp, clientListLength, searchPhoneNumber)
    } else if (stringValue.length === 0 && dateRange[0] !== 0 && searchPhoneNumber) {
      //search age & phone
      personSearch('age&phone', res, null, clientListLength, searchPhoneNumber, dateRange)
    } else if (stringValue.length > 0) {
      //search name only
      personSearch('name', res, stringValueRegExp, clientListLength)
    } else if (dateRange[0] !== 0) {
      //search birthday only
      personSearch('birthday', res, stringValueRegExp, clientListLength, null, dateRange)
    } else if (searchPhoneNumber) {
      //search phone only
      personSearch('phone', res, stringValueRegExp, clientListLength, searchPhoneNumber)
    }
  });

app.use('/', router);

app.listen(port);
console.log('Server listening on port ' + port);
