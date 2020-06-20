const router = require('express').Router();// import Router from express

let tasks = require('../models/tasks.model'); // import mongoose model

// route => handles imcoming http get requests
router.route('/').get((req, res) => {
    tasks.find() // get list of all the tasks from mongodb database 
        .then(tasks => res.json(tasks)) // in json
        .catch(err => res.status(400).json('1Error: ' + err)); // if error return 400 with err message
});

// one rule to save them all
router.route('/').post((req, res) => {

    let newC = req.body;
    // looping through the data from the front end(sorted)
    newC.map((one,index) => {
        // find the exact document in the collection and update it's order value
        tasks.findOneAndUpdate(
            { _id: one._id },
            { order:one.order },
            { upsert: true },
            (err, doc) => {
                console.log('here we update the tasks')
            }).then((doc) => console.log('success updating tasks'))
            .catch((err) => console.log('error updating tasks -> ' + err))

    })

});

// route => handles imcoming http post requests -> to edit
router.route('/edit/:id').post((req, res) => {
    console.log('edit task')
    tasks.findById(req.params.id) // get correct query based on the id passed
        .then(task => {
            console.log('edit task1')
            console.log(req.body.reorder)
            req.body.name ? task.name = req.body.name  : false
            req.body.subtasks ? task.subtasks.push({
                title:'title',
                descr:'sample subtask description'
            }) : false
            req.body.subtasksNewArray ? task.subtasks = req.body.subtasksNewArray : false
        
            req.body.reorder ? task.subtasks = req.body.reorder : false
        task.save()
            .then(() => res.json('TASKS updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('1Error: ' + err)); // if error return 400 with err message */
});

// route => if url /users/add run this post(if post only)
router.route('/addtask').post((req, res) => {
    console.log('innn')
    console.log(req.body)
    const name = 'adefaultq task name :(' // req.body.name; // from the input - the rest are the default values for the new empty task
    const subtasks = [];
    const projectName = req.body.projectName;
    const order = req.body.order;
    const newTask = new tasks({
        name,
        subtasks,
        projectName,
        order
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