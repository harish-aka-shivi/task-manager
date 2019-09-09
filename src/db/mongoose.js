const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser:true,
  useCreateIndex:true,
})


const User = mongoose.model('User', {
  name:{
    type: String,
  }, 
  age:{
    type:Number
  }
});

// const joey = new User({
//   name:'Joey',
//   age:30,
// });

// joey.save()

const Task = mongoose.model('Task', {
  description:{
    type:String,
  },
  completed:{
    type:Boolean,
  }
});

const learnNode = new Task({
  description:'Complete the nodejs course',
  completed:false,
})

learnNode.save().then(result => {
  console.log(result);
}).catch(error => {
  console.log(error);
})