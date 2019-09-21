const express = require('express');
const User = require('../models/user');
 
const router = new express.Router();


router.delete('/users/:id', async (req,res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);

  } catch(error) {
    res.status(500).send(error);
  }
})

router.patch('/users/:id', async (req,res) => {
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

router.get('/users/:id', async (req,res) => {
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


router.get('/users', async (req,res) => {

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


router.post('/users', async (req, res) => {
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

module.exports = router;