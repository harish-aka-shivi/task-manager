const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const app = express();
const auth = require('./middleware/auth');
const port = process.env.PORT || 3002;

// app.use((req, res, next) => {
//   res.status(503).send("site is currently down");
  // next();
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('server is up on port ' + port);
});

// const bcrypt = require('bcryptjs');

// const myFunction = async () => {

// }