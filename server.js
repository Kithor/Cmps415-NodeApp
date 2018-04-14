var express = require('express');
var chalk = require('chalk');
var app = express();
var router = express.Router();

const port = process.env.PORT || 9001;

//Test case
router.get('/test', (req, res) => {
    return res.status(200).send('Hello world');
});

//Get all EMRs
router.get('/rest/emr', (res) => {
    return res.status(200).send().json(emrs);    //Success status
});

//Get a single EMR
router.get('/rest/emr/id', (req,res) => {
    const id = req.body.id;
    var patient;
    var found = false;

    for(var i=0; i<emrs.EMRS.length;i++){
        if(emrs.EMRS[i].patientID == id){
            patient = emrs[i];
            found = true;
        }
    }
    if(!found){
        return res.status(404).send('Patient not found'); //Fail status
    }
    else{
        return res.status(200).send(patient);
    }
});

//Post a single EMR
router.post('/rest/emr', (req,res) => {
    
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
'{ "patientName":"Alice Smalls" , "patientID":"20164" , "bloodType":"AB Negative },' +
'{ "patientName":"Reggie Vence" , "patientID":"40725" , "bloodType":"O Negative" } ]}';