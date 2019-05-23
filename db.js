const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://thebongy:test123@cluster0-yxlto.mongodb.net/DareDB?retryWrites=true/', {useNewUrlParser:true},(err)=>{
    if (!err) {console.log('MongoDB Connection Succeeded.')}
    else {console.log('Error in DB connection: '+ err)}
});

require('./models');
