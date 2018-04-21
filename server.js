var express = require('express'),
  path = require('path'),
  emrs = require('./routes/emrs')
  mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const app = express()
const router = express.Router()

//set up DB connection (set up DB first)

//Include route to emr schema, ('/api/emrs') located in ./models/emrs

app.use('/rest/emr', emrs);
//app.set('view engine', 'ejs'); For if we decide to use EJS

app.listen(port, function(err) {
    if (err){
        console.log(err);
    } else {
        console.log('Server started on port ' + port);
    }
});