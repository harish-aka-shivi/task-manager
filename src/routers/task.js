const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();


router.patch('/tasks/:id', auth, async(req,res) => {
  const toBeUpdated = Object.keys(req.body);
  const allowedUpdated = ["description", "completed"];
  const toUpdate = toBeUpdated.every((update) => allowedUpdated.includes(update));

  if(!toUpdate) {
    res.status(400).send({'error':'cannot be updated'});
  }

  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})
    const task = await Task.findOne({_id:req.params.id, owner:req.user._id})
    // const task = await Task.findById(req.params.id);
    
    if(!task) {
        res.status(404).send("no task found");
    }
    
    toBeUpdated.forEach((update) => task[update] = req.body[update]);
    
    await task.save()
    
    if(!task) {
      return res.status(404).send("Task not found");
    }
    res.send(task);    
  } catch (error) {
    res.status(500).send(error)
  }
})

router.delete('/tasks/:id', auth, async (req,res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({_id:req.params.id, owner:req.user._id});
    if(!task) {
      return res.status(404).send('task not found');
    }

    res.send(task);

  } catch(error) {
    res.status(500).send(error);
  }
})


router.get('/tasks/:id', auth, async (req,res) => {
  const _id = req.params.id;
  // console.log('executed',id)
  
  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({_id, owner:req.user._id})
    
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

//GET /tasks?completed=true
//GET /tasks?limit=3&skip=3
//GET /tasks?sortby=createdAt:asc

router.get('/tasks', auth ,async (req,res) => {
  try {
    // const tasks = await Task.find({owner:req.user._id});  
    // there is an alternative way, 
    const match = {};

    if(req.query.completed) {
      match.completed = req.query.completed === 'true';
    }

    const sort = {};

    if(req.query.sortBy) {
      const parts = req.query.sortBy.split(':');

      sort[parts[0]] = parts[1] === 'asc' ? 1 : -1;
    }

    // await req.user.populate('tasks').execPopulate();
    await req.user.populate({
      path:'tasks',
      match,
      options:{
        limit:parseInt(req.query.limit),
        skip:parseInt(req.query.skip),
        sort,
      }
    }).execPopulate();
    
    res.send(req.user.tasks)
  } catch (error) {
    res.status(500).send(error);   
  }

  // Task.find({}).then(tasks => {
    
  // }).catch(error => {
  //  })
})

router.post('/tasks', auth ,async (req,res) => {
  //const task = new Task(req.body);

  const task = new Task({
    ...req.body,
    owner: req.user._id
  })
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


module.exports = router;
