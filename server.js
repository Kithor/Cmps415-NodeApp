var express = require('express');
var parse = require('url-parse');
var chalk = require('chalk');
var app = express();
var router = express.Router();

const port = process.env.PORT || 3000;

//initial
app.get('/', (req, res) => {
    res.status(200).send('Hello');
});

//Test case
app.get('/test', function (req, res){
    res.status(200).send('Hello world');
});

//Get all EMRs
app.get('/rest/emr', (req,res) => {
    res.status(200).send(emrs);    //Success status
});

//Get a single EMR
app.get('/rest/emr/id', (req,res) => {
    var p = parse(req.url, true);
    var q = p.query;
    var patient;
    var found = false;

    for(var i=0; i<emrs.EMRS.length;i++){
        if(emrs.EMRS[i].patientID == q.id){
            patient = emrs.EMRS[i];
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
    var p = parse(req.url, true);
    var q = p.query;
    let newEMR = {
        "patientName": q.patientName,        
        "patientID": q.patientID,
        "bloodType": q.bloodType
    };

    try{
        emrs['EMRS'].push(newEMR);
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

var emrs = '{ "EMRS" : [' +
'{ "patientName":"Olivier Rusty" , "patientID":"40725" , "bloodType":"O Positive" },' +
'{ "patientName":"Benjamin Kent" , "patientID":"98123" , "bloodType":"B Negative" },' +
'{ "patientName":"Julie Rogers" , "patientID":"44199" , "bloodType":"A Positive" },' +
'{ "patientName":"Alice Smalls" , "patientID":"20164" , "bloodType":"AB Negative" },' +
'{ "patientName":"Reggie Vence" , "patientID":"44685" , "bloodType":"O Negative" } ]}';
emrs = JSON.parse(emrs);
