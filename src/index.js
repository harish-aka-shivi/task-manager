const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3001;

const multer = require('multer');
const upload = multer({
  dest:'uploads',
  limits:{
    fileSize:1000000
  },
  fileFilter(req,file,cb) {
    // console.log(req,file);
    // if(!file.originalname.endsWith('.pdf')) {
    if(!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('please upload a word document'));
    }
    cb(undefined, true)
  }
})
// app.use((req, res, next) => {
//   res.status(503).send("site is currently down");
  // next();
// })

app.post('/upload', upload.single('upload') ,async (req, res) => {
  res.send();
},(error,req,res,next) => {
  res.status(400).send({ error: error.message})
})


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('server is up on port ' + port);
});

// const bcrypt = require('bcryptjs');

// const myFunction = async () => {

// }