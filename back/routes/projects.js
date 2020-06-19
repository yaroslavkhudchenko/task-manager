const router = require('express').Router();// import Router from express

let projects = require('../models/projects.model'); // import mongoose model

// route => handles imcoming http get requests /users
router.route('/').get((req, res) => {
    projects.find() // get list of all the users from mongodb database 
        .then(user => res.json(user)) // in json
        .catch(err => res.status(400).json('Errorй: ' + err)); // if error return 400 with err message
});

// route => if url /users/add run this post(if post only)
router.route('/addproject').post((req, res) => {
    

    const name = req.body.name; // from the input - the rest are the default values for the new empty project
    const nbTask = 0;
    const tasks = []; 


    const newProject = new projects({
        name,
        nbTask,
        tasks,
    }); // create the projects with the given values

    newProject.save() // save to databse
        .then(() => res.json('New project added!'))
        .catch(err => res.status(400).json('Errorц: ' + err)); // if error return 400 with err message
});

// route => handles imcoming http post requests -> to edit
router.route('/edit/:id').post((req, res) => {
    console.log('edit project')
    projects.findById(req.params.id) // get correct query based on the id passed
        .then(project => {
            console.log('edit project1')
            req.body.name ? project.name = req.body.name  : false
            
        project.save()
          .then(() => res.json("project is updated!"))
          .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json('1Error: ' + err)); // if error return 400 with err message */
});

// to delete project with id
router.route('/:id').delete((req, res) => {
    let tasks = require('../models/tasks.model'); // import mongoose model

    tasks.deleteMany({ "projectName": req.body.projectName }).
        then(() => res.json('success deleting project tasks'))
        .catch((err) => console.log('error on deleing project tasks ', err))
        
    projects.findByIdAndDelete(req.params.id)// will find the exact project in the db and delete it
        .then(() => res.json('Project successfully deleted.'))
        .catch(err => res.status(400).json('wError: ' + err));
 
});



module.exports = router; // export router