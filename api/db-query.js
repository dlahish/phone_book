const personSearch = require('./models/personSearch')
const dbFunctions = require('./db-functions')

module.exports = {
  findPeopleInDatabase: function(req, res) {
    const clientListLength = req.body.listLength
    const searchValue = req.body.searchValue
    var splittedSearchValue = searchValue.split(" "),
        nameValue = '',
        nameValueRegExp = '',
        birthdayDateRange = [0, 0],
        phoneNumberToSearch,
        numberValue

    splittedSearchValue.forEach(function(section) {
      if (section === '') {
      } else if (isNaN(section)) {
          phoneNumberToSearch = section.charAt(4) === '-' ? dbFunctions.formatPhoneNumber(section, true) : ''
          nameValue = nameValue.length === 0 ? section : nameValue + ' ' + section
          nameValueRegExp = new RegExp('^' + nameValue, 'i')
      } else {
          numberValue = parseInt(section)
          if (numberValue < 100 && birthdayDateRange[0] === 0) {
              birthdayDateRange = dbFunctions.birthdayDateRange(numberValue)
          } else if (section.length >= 4 && section.charCodeAt(3) >= 48 && section.charCodeAt(3) <= 57) {
              section = section.slice(0,4) + '-' + section.slice(4)
              phoneNumberToSearch = dbFunctions.formatPhoneNumber(section, false)
          } else {
              phoneNumberToSearch = dbFunctions.formatPhoneNumber(numberValue, false)
          }
      }
    })

    const queryType = dbFunctions.getQueryType(nameValue, birthdayDateRange, phoneNumberToSearch)

    personSearch(queryType, res, nameValueRegExp, clientListLength, phoneNumberToSearch, birthdayDateRange)
  }
}
