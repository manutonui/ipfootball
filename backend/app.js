require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000
const matchesApi = require('./routes/matches')
const usersApi = require('./routes/users')
const managersApi = require('./routes/managers')

mongoose.connect(process.env.MONGO_URI).then(() => { console.log("Mongodb connected") }).catch(e => { console.log("MongoDB Error!");console.log(e) })

app.use(express.json())

app.use(( req, res, next) => { // logs all requests
    console.log(req.path, req.method)
    next()
})

app.use('/matches', matchesApi)
app.use('/users', usersApi)
app.use('/managers', managersApi)

// middleware to catch non-existing routes
app.use( function(req, res, next) {
    // you can do what ever you want here e.g render page '404 Not Found'
    res.status(404).json({error: "Route doesn't exist"})
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});