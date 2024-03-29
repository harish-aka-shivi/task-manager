const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required:true,
    trim:true,
  },
  email:{
    type:String,
    unique: true,
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
  },
  tokens: [{
     token:{
       type:String,
       required:true,
     }
  }],
  avatar: {
    type: Buffer,
  }
}, {
  timestamps:true,
});

userSchema.virtual('tasks', {
  ref:'Task',
  localField:'_id',
  foreignField:'owner'

})

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
}

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({_id:user._id.toString()}, process.env.JSON_WEB_SECRET_KEY);

  user.tokens = user.tokens.concat({
    token,
  });
  await user.save();

  return token;
}

userSchema.statics.findByCredentials = async (email, pasword) => {
  const user = await User.findOne({email});

  if(!user) {
    throw new Error('Unable to error');
  }

  const isMatch = await bcrypt.compare(pasword, user.password);

  if(!isMatch) {
    throw new Error('Unable to error');
  }

  return user;
}

// Hash the password
userSchema.pre('save', async function(next) {
  const user = this;
  // console.log('just before saving');
  if(user.isModified("password")) {
    user.password = await bcrypt.hash(user.password,8)
  }
  next();

})

// delete user task when user is removed  
userSchema.pre('remove', async function(next) {
  const user = this;
  await Task.deleteMany({owner:user._id});
  next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;