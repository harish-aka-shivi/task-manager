require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5d7c6de5fd2bcd1210f2ed92')
// .then(task => {
//   console.log(task);
//   return Task.countDocuments({completed:true})
// }).then(count => {
//   console.log(count);
// })

const findByIdAndDeleteAsync = async (id) => {
  const deletedTask = await Task.findByIdAndDelete(id);
  console.log(deletedTask);
  const count = await Task.countDocuments({completed:false});
  return count;
}

findByIdAndDeleteAsync("5d7c747053bcd3157af3a806").then(res => {
  console.log(res);
}).catch(error => {
  console.log(error);
})