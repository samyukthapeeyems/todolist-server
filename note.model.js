const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },

}, {timestamps: true})

const note = mongoose.model("note", noteSchema);

module.exports = note;