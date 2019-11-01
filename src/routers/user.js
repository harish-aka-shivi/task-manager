const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();
const multer = require('multer');
const sharp = require('sharp');
const { sendWelcomeEmail, sendGoodbyeEmail } = require('../emails/account');

router.post('/users/logout', auth, async (req,res) => {
  try {
    // console.log(req.user.tokens)
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    // console.log(req.user.tokens)
    await req.user.save();
    res.send()
  } catch (error) {
    res.status(500).send();
  }
})

router.post('/users/logoutAll', auth, async (req,res) => {
  try{
    req.user.tokens = [];
    await req.user.save();
    // console.log(req.user.tokens instanceof Array);
    res.send();
  } catch(error) {
    res.send(500).send();
  }
})

router.get('/users/me', auth, async (req,res) => {
  // console.log('in me')
  res.send(req.user);
  // try {
  //   const users = await User.find({});
  //   res.status(200).send(users);
  // } catch (error) {
  //   res.status(500).send(error);
  // }

  // User.find({}).then((users) => {
  //   res.status(200).send(users)
  // }).catch(error => {
  //   res.status(500).send(error)
  // })
})

router.delete('/users/me', auth,  async (req,res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id);
    
    // if(!user) {
    //   return res.status(404).send('User not found');
    // }
    sendGoodbyeEmail(req.user.email, req.user.name);
    req.user.remove();
    res.send(req.user);

  } catch(error) {
    console.log(err)
    res.status(500).send(error);
  }
})

// update this structure with atuhentication
router.patch('/users/me', auth, async (req,res) => {
  const updates = Object.keys(req.body);
  const validOperaions = ["name", "email", "password", "age"]
  const isValidOperation = updates.every(update => validOperaions.includes(update));

  if(!isValidOperation) {
    return  res.status(400).send({'error':'invalid operation'});  
  }

  try {
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true,runValidators: true})
    
    // const user = await User.findById(req.params.id);

    const user = req.user;

    updates.forEach((update) =>  user[update] = req.body[update]);

    await user.save();

    // if(!user) {
    //   return res.status(404).send("Not found");
    // }
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
})

// router.get('/users/:id', async (req,res) => {
//   const id = req.params.id;

//   try {
//     const user = await User.findById(id);
//     if(!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(505).send(error);
//   }

  // User.findById(id).then(user => {
  //   if(!user) {
  //     return res.status(404).send();
  //   }
  //   res.send(user);
  // }).catch(error => {
  //   res.status(505).send(error);
  // })
// })




router.post('/users/login', async(req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({user, token});
  } catch(error) {
     res.status(400).send();
  }
})

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  
  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.send({user, token});
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

const upload = multer({
  // dest:'avatars',
  limits:{
    fileSize:1000000
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('please upload an (jpg/jpeg/png)image'));
    }
    cb(undefined, true)
  }
})

router.post('/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    try {
      // console.log(req.file);
      // req.user.avatar = req.file.buffer;
      const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
      req.user.avatar = buffer;
      await req.user.save();
      res.send();
    } catch (error) {
      // console.log(error)
      res.status(500).send();
    }
   
  },
  (error,req,res,next) => {
    res.status(400).send({ error: error.message})
  }
)

router.delete('/users/me/avatar',
  auth,
  // upload.single('avatar'),
  async (req, res) => {
    try {
      // console.log(req.file);
      req.user.avatar = undefined;
      await req.user.save();
      res.send();
    } catch (error) {
      // console.log(error)
      res.status(500).send();
    }
   
  },
  (error,req,res,next) => {
    res.status(400).send({ error: error.message})
  }
)

router.get('/users/:id/avatar', async (req,res) => {
  try{
    const user = await User.findById(req.params.id);
    if(!user || !user.avatar) {
      throw new Error();
    }

    res.set('Content-Type', 'image/png');
    res.send(user.avatar)
  } catch(e) {
    res.status(404).send();
  }
})

module.exports = router;