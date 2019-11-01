const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser:true,
  useCreateIndex:true,
})




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

// const Task = mongoose.model('Task', {
//   description:{
//     type:String,
//     required:true,

//   },
//   completed:{
//     type:Boolean,
//     required:false,
//     default:false,
//   }
// });


// const task= new Task({
//   description:'complete mongo',
// })

// task.save().then(result => {
//   console.log(result);
// }).catch(error => {
//   console.log(error);
// })