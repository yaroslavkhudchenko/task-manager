
/* 
    Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addProjectScheme = new Schema({ // create new schema
    name: { // field with validations
        type: String,
        required: true,
        unique: true,
        trim: true, // white space at the end
        minlength: 1  // min length for name
    },
    nbTask: {
        type: Number,
        required: true
    },
    tasks: {
        type: Array,
        required: true
    }
}, {
    timestamps: true // stamps when created/modified
});

const projects = mongoose.model('projects', addProjectScheme);

module.exports = projects; // export projects variable
