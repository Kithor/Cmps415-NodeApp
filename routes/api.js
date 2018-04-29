var router = require('express').Router(),
    urlParser = require('url-parse'),
    bodyParser = require('body-parser')

const EMR = require('../models/emr');

var jsonParser = bodyParser.json()

/*---------------------- GET Requests ----------------------*/
//get all emrs
router.get('/', (req, res) => {
    EMR.getEmrs(function(err, emrs){
		if(err) {
			throw err;
		}
		res.status(200).json(emrs);
	});
});

//get one emr by id
router.get('/id', (req, res) => {
    var id = urlParser(req.url, true).query.id;

    EMR.getEmrById(id, (err, emr) => {
        if(err){
            console.log(err)
            res.status(404).send(err); //Fail status
        }
        else{
            res.status(200).send(emr);
        }
    })
});

//get one emr by name
router.get('/name', (req, res) => {
    var name = urlParser(req.url, true).query.name;

    EMR.getEmrByName(name, (err, emr) => {
        if(err){
            res.status(404).send('Patient not found'); //Fail status
        }
        else{
            res.status(200).send(emr);
        }
    })
});

/*---------------------- Post Requests ----------------------*/
//post new emr
router.post('/', jsonParser, (req, res) => {
    let newEMR = new EMR({
        "id": req.body.id,
        "name": req.body.name,
        "address": req.body.address,
        "medications": req.body.medications,
        "birthdate": req.body.birthdate,
        "provider": req.body.provider
    })
    //console.log(newEMR);

    EMR.addEmr(newEMR, (err) => {
        if(err){
            console.log(err)
            res.status(406).send('Something went wrong')
        } else {
            res.status(200).send('Patient was added successfully');
        }
    })
});

/*---------------------- Put Requests ----------------------*/
router.put('/id', jsonParser, (req, res) => {
    var updtEMR
    //console.log(req.body)
    
    if(req.body.hasOwnProperty("id")) {
        updtEMR = {id: req.body.id}
    } else {
        res.send('ID is required to update a patient')
    }
    
    if(req.body.hasOwnProperty("name")){ updtEMR.name = req.body.name }
    if(req.body.hasOwnProperty("address")){ updtEMR.address = req.body.address }
    if(req.body.hasOwnProperty("medications")){ updtEMR.medications = req.body.medications }
    if(req.body.hasOwnProperty("birthdate")){ updtEMR.birthdate = req.body.birthdate }
    if(req.body.hasOwnProperty("provider")){ updtEMR.provider = req.body.provider }

    //console.log(updtEMR)

    EMR.updateEmr(updtEMR, (err) => {
        if(err){
            console.log(err)
            res.status(406).send('Something went wrong');
        } else {
            res.status(200).send('Patient was updated successfully and unlocked')
        }
    })
});

/*---------------------- Delete Requests ----------------------*/
router.delete('/id', jsonParser, (req,res) => {
    if(req.body.hasOwnProperty("id")) {
        var id = req.body.id
    } else {
        res.send('ID is required to delete a patient')
    }

    EMR.removeEmrById(id, (err) => {
        if(err){
            console.log(err)
            res.status(406).send('Something went wrong')
        } else {
            res.status(200).send('Patient Deleted')
        }
    })
});

module.exports = router