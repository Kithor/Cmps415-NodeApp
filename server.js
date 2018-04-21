var express = require('express'),
  path = require('path'),
  mongoose = require('mongoose');

const config = require('./config/database');
const api = require('./routes/api')
const port = process.env.PORT || 3000;

const app = express()
const router = express.Router()

/*---------------------- DB Connection ----------------------*/
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', () => {
	console.log('Connected to database');
});

//ON Error
mongoose.connection.on('error', (err) => {
	console.log('Database error ' + err);
});

/*---------------------- Middleware ----------------------*/
app.use('/rest/emr', api);
//app.set('view engine', 'ejs'); For if we decide to use EJS

app.listen(port, function(err) {
    if (err){
        console.log(err);
    } else {
        console.log('Server started on port ' + port);
    }
});