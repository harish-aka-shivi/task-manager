const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3001;

const multer = require('multer');
const upload = multer({
  dest:'images',
  limits:{
    fileSize:1000000
  }
})
// app.use((req, res, next) => {
//   res.status(503).send("site is currently down");
  // next();
// })

app.post('/upload', multer({
  dest:'images'
}).single('upload') ,async (req, res) => {
  res.send();
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