const mongoose = require('mongoose');

const TodoSchema =  mongoose.Schema({
    useremail :{ type: String,},
    name: { type: String, required: true },
    Duration : { type : String, required: true },
    Startdate : { type : String, required: true },
    Enddate : { type : String, required: true },
    
  });

module.exports = mongoose.model('ionicTodo', TodoSchema);