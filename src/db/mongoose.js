const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser:true,
  useCreateIndex:true,
})


const User = mongoose.model('User', {
  name:{
    type: String,
    required:true,
    trim:true,
  },
  email:{
    type:String,
    required:true,
    trim:true,
    lowercase:true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password:{
    type:String,
    required:true,
    trim:true,
    validate(value) {
      if(value.length < 6) {
        throw new Error("length of string should be greater than 6");
      } else if(value.includes("password")) {
        throw new Error("It must not contain password");
      }
    }
  }, 
  age:{
    type:Number,
    default:0,
    validate(value) {
      if(value < 0) {
        throw new Error("Age must be a poistive number");
      }
    }
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