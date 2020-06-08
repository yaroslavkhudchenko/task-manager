const router = require('express').Router();// import Router from express

let tasks = require('../models/tasks.model'); // import mongoose model

// route => handles imcoming http get requests
router.route('/').get((req, res) => {
    tasks.find() // get list of all the users from mongodb database 
        .then(tasks => res.json(tasks)) // in json
        .catch(err => res.status(400).json('1Error: ' + err)); // if error return 400 with err message
});

// route => handles imcoming http post requests -> to edit name
router.route('/edit/:id').post((req, res) => {
    
    tasks.findById(req.params.id) // get correct query based on the id passed
        .then(task => {
            req.body.name ? task.name = req.body.name  : false
            req.body.subtasks ? task.subtasks.push({
                title:'default',
                descr:'write smth pleaes'
            }) : false
            req.body.subtasksNewArray ? task.subtasks = req.body.subtasksNewArray : false
        
        task.save()
            .then(() => res.json('Exercise updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('1Error: ' + err)); // if error return 400 with err message */
});

// route => if url /users/add run this post(if post only)
router.route('/addtask').post((req, res) => {

    const name = 'adefaultq task name :(' // req.body.name; // from the input - the rest are the default values for the new empty task
    const subtasks = [];
    const projectName = req.body.projectName;

    const newTask = new tasks({
        name,
        subtasks,
        projectName
    }); // create the tasks with the given values

    newTask.save() // save to databse
        .then(() => res.json('New task added!'))
        .catch(err => res.status(400).json('Erwwwrorц: ' + err)); // if error return 400 with err message
});


// to delete task with id
router.route('/:id').delete((req, res) => {
    tasks.findByIdAndDelete(req.params.id)// will find the exact task in the db and delete it
        .then(() => res.json('Task successfully deleted.'))
        .catch(err => res.status(400).json('2Error: ' + err));
});



module.exports = router; // export router