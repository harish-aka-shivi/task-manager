const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
  description:{
    type:String,
    required:true,

  },
  completed:{
    type:Boolean,
    required:false,
    default:false,
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    
  }
});

module.exports = Task;