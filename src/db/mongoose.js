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
    minlength:7,
    validate(value) {
      if(value.toLowerCase().includes('password')) {
        throw new Error("Password cannot contain password");
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

// const me = new User({
//   name:'harish',
//   age:21,
//   email:'r.shivi@yahoo.com',
//   completed:false,
//   password:'virtual1'
// })

const Task = mongoose.model('Task', {
  description:{
    type:String,
    required:true,

  },
  completed:{
    type:Boolean,
    required:false,
    default:false,
  }
});


const task= new Task({
  description:'complete mongo',
})

task.save().then(result => {
  console.log(result);
}).catch(error => {
  console.log(error);
})