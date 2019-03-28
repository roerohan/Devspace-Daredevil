const mongoose = require('mongoose');

var quesSchema = new mongoose.Schema({
    question:{
        type: String,
    },
    qno:{
        type: Number,
    },
});

mongoose.model('Question', quesSchema);

var stateSchema = new mongoose.Schema({
    currentQuestion:{
        type: String,
    },
    currentLeader:{
        type: String,
    }
})


mongoose.model('State', stateSchema);
