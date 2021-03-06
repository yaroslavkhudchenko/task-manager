
/* 
    Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Tasks = new Schema({ // create new schema
    name: { // field with validations
        type: String,
        required: true,
        trim: true, // white space at the end
        minlength: 0 // min length for name
    },
    subtasks: {
        type: Array,
        required: true
    },
    projectName: {
        type: String,
        required:true
    },
    order: {
        type: Number,
        required: true
    }
}, {
    timestamps: true // stamps when created/modified
});

const tasks = mongoose.model('tasks', Tasks);

module.exports = tasks; // export projects variable
