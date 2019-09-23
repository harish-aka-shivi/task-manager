const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async(req, res, next) => {
  try {
    // console.log('in middleware')
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token,"secretKey");
    // console.log(decoded);
    const user = await User.findOne({_id:decoded._id, 'tokens.token':token});

    if(!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user; // passing the data to route to prevent extra computation. 
  } catch (error) {
    res.status(401).send({"error": "please authenticate"}); 
  }

  next();
}

module.exports = auth;