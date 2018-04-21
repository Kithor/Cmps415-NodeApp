var express = require('express'),
  bodyParser = require("body-parser"),
  urlParser = require('url-parse'),
  path = require('path'),
  emrs = require('./routes/emrs')
  //require('mongoose');

const app = express();
const router = express.Router();

const port = process.env.PORT || 3000;

//set up DB connection (set up DB first)

//Include route to emr schema, ('/api/emrs') located in ./models/emrs

app.use(bodyParser.json())
app.use(urlParser)

app.use('/api', router);
app.use('/rest/emr', emrs);
app.set('view engine', 'ejs'); //resolve index issues

/*app.get('/', (req,res)=>{
    res.render('index');
});*/

app.listen(port, function(err) {
    if (err){
        console.log(err);
    } else {
        console.log('Server started on port ' + port);
    }
});



//Move all of the following HTTP requests to routes folder
/*app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/', (req, res) => {
    res.status(200).send('Hello');
});

//Get all EMRs
app.get('/rest/emr', (req,res) => {
    res.status(200).send(data.emrs);    //Success status
});

//Get a single EMR
app.get('/rest/emr/id', (req,res) => {
    var p = urlParser(req.url, true);
    var q = p.query;
    var patient;
    var found = false;

    for(var i=0; i<data.emrs.length;i++){
        if(data.emrs[i].id == q.id){
            patient = data.emrs[i];
            found = true;
        }
    }
    if(!found){
        res.status(404).send('Patient not found'); //Fail status
    }
    else{
        res.status(200).send(patient);
    }
});

//Post a single EMR
app.post('/rest/emr', (req,res) => {
    //console.log(req.body);
    var p = urlParser(req.url, true);
    var q = p.query;
    let newEMR = {
        "id": q.id,        
        "name": q.name,
        "address": q.address,
        "medications": q.medications,
        "birthdate": q.birthdate,
        "provider": q.provider
    };

    try{
        data['emrs'].push(newEMR);
        res.status(200).send('Patient was added successfully');
    }
    catch(err){
        res.status(406).send('Something went wrong');
    }
});*/

//Move data to MongoDB, set up DB calls in model folder
/*var data = '{"emrs": [{  "id": "0000-44444",' +
                        '"name": "Monica Latte",' +
                        '"address": "444 Coffee Ave",' +
                        '"medications": ["PRINIVIL TABS 20 MG (LISINOPRIL) 1 po qd","HUMULIN INJ 70/30 (INSULIN REG & ISOPHANE (HUMAN)) 20 units ac breakfast"],' +
                        '"birthdate": "04/04/1950",' +
                        '"provider": "Dr. Carl Savem"},'+
                    '{' +   
                        '"id": "3210-98992",' +
                        '"name": "Oliver Rusty",' +
                        '"address": "647 Laural Ave",' +
                        '"medications": ["Percecet","Xanax"],' +
                        '"birthdate": "03/16/1992",' +
                        '"provider": "Dr. Dre"},' +
                    '{' +   
                        '"id": "5166-00021",' +
                        '"name": "Richard Blubber",' +
                        '"address": "901 Shelby Dr",' +
                        '"medications": [""],' +
                        '"birthdate": "10/24/1986",' +
                        '"provider": "Dr. John Burris"} ]}';
data = JSON.parse(data);*/
