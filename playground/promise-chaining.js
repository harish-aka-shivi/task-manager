require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('5d7c6de5fd2bcd1210f2ed92')
.then(task => {
  console.log(task);
  return Task.countDocuments({completed:true})
}).then(count => {
  console.log(count);
})