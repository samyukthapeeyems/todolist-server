const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const noteModel = require('./note.model');

const app = express();

app.use(cors());

app.use([express.urlencoded({extended: false}), express.json()]);

app.get('/notes', (req, res, next) => {
    noteModel.find({}, (err, docs) => {
        if(err)
            res.json({message: err});
        else{
            res.json(docs);
        }
    })
})

app.post('/notes', (req, res, next) => {
    console.log(req.body);
    if(req.body.title === undefined){
        res.status(400).send('title is required');
    }
    noteModel.create(req.body).then(() => {
        res.status(200).send('note added');
    })
    .catch(e => {
        res.status(400).send(e.message);
    })
})


mongoose.connect("mongodb://127.0.0.1/notes", { useNewUrlParser: true, useUnifiedTopology: true })
.catch(e => {
    console.log(e);
});



app.listen(8080, () => {
    console.log("Server started");
})