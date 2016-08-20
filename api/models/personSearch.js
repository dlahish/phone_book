module.exports = function(searchType, res, stringValueRegExp, clientListLength, searchPhoneNumber, dateRange) {
  const Person = require('./person');
  switch (searchType) {
    case 'name&age&phone':
      return (
        Person
          .find({ $and: [
            { name: stringValueRegExp },
            { phone: searchPhoneNumber },
            { $and: [
              { birthday: { $gt: dateRange[0] } },
              { birthday: { $lte: dateRange[1] } }
            ]}
          ]})
          .skip(clientListLength)
          .limit(10)
          .exec(function(err, personName) {
            if (err)
              res.send(err);
            res.json(personName)
          })
      )
    case 'name&age':
      return (
        Person
          .find({ $and: [
            { name: stringValueRegExp },
            { $and: [
              { birthday: { $gt: dateRange[0] } },
              { birthday: { $lte: dateRange[1] } }
            ]}
          ]})
          .skip(clientListLength)
          .limit(10)
          .exec(function(err, personName) {
            if (err)
              res.send(err);
            res.json(personName)
          })
      )
    case 'name&phone':
      return (
        Person
          .find({ $and: [
            { name: stringValueRegExp },
            { phone: searchPhoneNumber }
          ]})
          .skip(clientListLength)
          .limit(10)
          .exec(function(err, personName) {
            if (err)
              res.send(err);
            res.json(personName)
          })
      )
    case 'age&phone':
      return (
        Person
          .find({ $and: [
            { phone: searchPhoneNumber },
            { $and: [
              { birthday: { $gt: dateRange[0] } },
              { birthday: { $lte: dateRange[1] } }
            ]}
          ]})
          .skip(clientListLength)
          .limit(10)
          .exec(function(err, personName) {
            if (err)
              res.send(err);
            res.json(personName)
          })
      )
    case 'name':
      return (
        Person
          .find({ name: stringValueRegExp })
          .skip(clientListLength)
          .limit(10)
          .exec(function(err, personName) {
            if (err)
              res.send(err);
            res.json(personName)
          })
      )
    case 'birthday':
      return (
        Person
          .find({ $and: [
            { birthday: { $gt: dateRange[0] } },
            { birthday: { $lte: dateRange[1] } }
          ]})
          .skip(clientListLength)
          .limit(10)
          .exec(function(err, personName) {
            if (err)
              res.send(err);
            res.json(personName)
          })
      )
    case 'phone':
      return (
        Person
          .find({ phone: searchPhoneNumber })
          .skip(clientListLength)
          .limit(10)
          .exec(function(err, personName) {
            if (err)
              res.send(err);
            res.json(personName)
          })
      )
    default:
      console.log('something went wrong')

  }
}
