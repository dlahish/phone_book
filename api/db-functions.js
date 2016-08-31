module.exports = {
  birthdayDateRange: function(searchValue) {
    var today = new Date().getTime() / 1000
    var dateBeforeBirthday = today - searchValue * 31556926 - 86400 - 31556926
    var dateAfterBirthday = today - searchValue * 31556926 - 86400
    return [dateBeforeBirthday, dateAfterBirthday]
  },

  formatPhoneNumber: function(searchValue, shouldAddHyphen) {
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
  },

  getQueryType: function(nameValue, birthdayDateRange, phoneNumberToSearch) {
    if (nameValue.length > 0) {
      if (birthdayDateRange[0] !== 0) {
        if (phoneNumberToSearch) {
          return 'name&age&phone'
        } else {
          return 'name&age'
        }
      } else {
        if (phoneNumberToSearch) {
          return 'name&phone'
        } else {
          return 'name'
        }
      }
    } else {
      if (birthdayDateRange[0] !== 0) {
        if (phoneNumberToSearch) {
          return 'age&phone'
        } else {
          return 'birthday'
        }
      } else {
        return 'phone'
      }
    }
  }
}
