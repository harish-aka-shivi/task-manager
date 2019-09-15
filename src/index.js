const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

app.patch('/users/:id', async (req,res) => {
  const updates = Object.keys(req.body);
  const validOperaions = ["name", "email", "password", "age"]
  const isValidOperation = updates.every(update => validOperaions.includes(update));

  if(!isValidOperation) {
    return  res.status(400).send({'error':'invalid operation'});  
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true,runValidators: true})
    
    if(!user) {
      return res.status(404).send("Not found")
    }
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
})

app.get('/users/:id', async (req,res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if(!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(505).send(error);
  }

  // User.findById(id).then(user => {
  //   if(!user) {
  //     return res.status(404).send();
  //   }
  //   res.send(user);
  // }).catch(error => {
  //   res.status(505).send(error);
  // })
})


app.get('/users', async (req,res) => {

  try {
    const users = await User.find({});
    res.status(200).send(users)
  } catch (error) {
    res.status(500).send(error)
  }

  // User.find({}).then((users) => {
  //   res.status(200).send(users)
  // }).catch(error => {
  //   res.status(500).send(error)
  // })
})


app.post('/users', async (req, res) => {
  const user = new User(req.body);
  
  try {
    await user.save();
    res.send(user);
  } catch(error) {
    console.log(error);
    res.status(400).send(error);
  }

  // user.save().then(result => {
  //   // console.log(result);  
  //   res.send('success' + result);
  // }).catch(error => {
  //   // console.log(error);
  //   res.status(400).send(error); 
  //   // res.send('error' + error)
  // })  
})

app.patch('/tasks/:id', async(req,res) => {
  const toBeUpdated = Object.keys(req.body);
  const allowedUpdated = ["description", "completed"];
  const toUpdate = toBeUpdated.every((update) => allowedUpdated.includes(update));

  if(!toUpdate) {
    res.status(400).send({'error':'cannot be updated'});
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})
    if(!task) {
      return res.status(404).send("Task not found");
    }
    res.send(task);    
  } catch (error) {
    res.status(500).send(error)
  }



})

app.get('/tasks/:id', async (req,res) => {
  const _id = req.params.id;
  // console.log('executed',id)
  
  try {
    const task = await Task.findById(_id);
    if(!task) {
      return res.status(404).send('not found');
    } 
    res.send(task);
  } catch (error) {
    res.status(500).send(error)
  }

  // Task.findById(_id).then(task => {
  //   // console.log('executed',task)
  //   if(!task) {
  //     return res.status(404).send('error');
  //   } 
  //   res.send(task);
  // }).catch(error => {
  //   res.status(500).send(error)
  // })
})

app.get('/tasks', async (req,res) => {
  try {
    const tasks = await Task.find({});    
    res.send(tasks)
  } catch (error) {
    res.status(500).send(error);   
  }

  // Task.find({}).then(tasks => {
    
  // }).catch(error => {
  //  })
})

app.post('/tasks', async (req,res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(200).send(task);  
  } catch(error) {
    res.status(400).send(error);
  }

  // task.save().then(result => {
  //   console.log(result);  
  //   res.status(200).send(result);
  // }).catch(error => {
  //   console.log(error);
  //   res.status(400).send(error); 
  //   // res.send('error' + error)
  // })
})


app.listen(port, () => {
  console.log('server is up on port ' + port);
})  