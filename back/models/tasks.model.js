
/* 
    Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tasks = new Schema({ // create new schema
    name: { // field with validations
        type: String,
        required: true,
        unique: true,
        trim: true, // white space at the end
        minlength: 3 // min length for name
    },
    subtasks: {
        type: Array,
        required: true
    },
    archived: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true // stamps when created/modified
});

const tasks = mongoose.model('tasks', tasks);

module.exports = projects; // export projects variable
