var router = require('express').Router(),
    urlParser = require('url-parse'),
    bodyParser = require('body-parser')

//Note: we use this parser because we are using postman urlencoded bodies
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/*---------------------- GET Requests ----------------------*/
//get all emrs
router.get('/', (req,res) => {
    res.status(200).send(data.emrs);
});

//get one emr by id
router.get('/id', (req,res) => {
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

//get one emr by name
router.get('/name', (req,res) => {
    var p = urlParser(req.url, true);
    var q = p.query;
    var patient;
    var found = false;

    for(var i=0; i<data.emrs.length;i++){
        if(data.emrs[i].name == q.name){
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

/*---------------------- Post Requests ----------------------*/
//post new emr
router.post('/', urlencodedParser, (req,res) => {
    console.log(req.body)
    let newEMR = {
        "id": req.body.id,
        "name": req.body.name,
        "address": req.body.address,
        "medications": req.body.medications,
        "birthdate": req.body.birthdate,
        "provider": req.body.provider
    };

    console.log(newEMR);
    if(newEMR != undefined){
        try{
            data['emrs'].push(newEMR);
            res.status(200).send('Patient was added successfully');
        }
        catch(err){
            res.status(406).send('Something went wrong');
        }
    }
});

//post update to emr
router.put('/', (req,res) => {
    //phase 2
});

/*---------------------- Delete Requests ----------------------*/
router.delete('/', (req,res) => {
    //phase 2
});


/*---------------------- Temporary Data ----------------------*/
//Move data to MongoDB, set up DB calls in model folder
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

module.exports = router