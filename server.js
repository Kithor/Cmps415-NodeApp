var express = require('express');
var urlParser = require('url-parse');
var bodyParser = require("body-parser");
var path = require('path');
var chalk = require('chalk');
var app = express();
var router = express.Router();

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



//initial response
/*app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});*/
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
    console.log(req.body);
    /*var p = parse(req.url, true);
    var q = p.query;*/
    let newEMR = {
        "id": req.body.id,        
        "name": req.body.name,
        "address": req.body.address,
        "medications": req.body.medications,
        "birthdate": req.body.birthdate,
        "provider": req.body.provider
    };

    try{
        data['emrs'].push(newEMR);
        res.status(200).send('Patient was added successfully');
    }
    catch(err){
        res.status(406).send('Something went wrong');
    }
});

app.use('/api', router);

app.listen(port, function(err) {
    if (err){
        console.log(chalk.red(err));
    } else {
        console.log(chalk.blue('Server started on port ' + port));
    }
});

var data = '{"emrs": [{  "id": "0000-44444",' +
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
data = JSON.parse(data);
