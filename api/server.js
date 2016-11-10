const express      = require('express');
const app          = express();
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const cors         = require('cors');
const mongoose     = require('mongoose');
const dbQuery      = require('./db-query');

// mongoose.connect('mongodb://localhost/klarna');
mongoose.connect('mongodb://localhost/phonebook');
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
    res.json({ message: 'Welcome to our api!' });
});

app.post('/people', function(req, res){
  dbQuery.findPeopleInDatabase(req, res)
})

app.listen(port);
console.log('Server listening on port ' + port);
