const router = require('express').Router();// import Router from express

let Addproject = require('../models/addproject.model'); // import mongoose model

// route => handles imcoming http get requests /users
router.route('/addproject').post((req, res) => {
    Addproject.find() // get list of all the users from mongodb database 
        .then(user => res.json(user)) // in json
        .catch(err => res.status(400).json('Error: ' + err)); // if error return 400 with err message
});

// route => if url /users/add run this post(if post only)
router.route('/add').post((req, res) => {


    const name = req.body.name; // from the input - the rest are the default values for the new empty project
    const nbTask = 0;
    const tasks = []; 
    const archived = false; 


    const newProject = new Addproject({
        name,
        nbTask,
        tasks,
        archived
    }); // create the Addproject with the given values

    newProject.save() // save to databse
        .then(() => res.json('Addproject added!'))
        .catch(err => res.status(400).json('Error: ' + err)); // if error return 400 with err message
});

module.exports = router; // export router