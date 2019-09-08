const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = "task-manager";


MongoClient.connect(connectionUrl, {useNewUrlParser:true}, (error, client) => {
  if(error) {
    return console.log('unable to connect to db')
  }
  // console.log('connected correctly')
  const db = client.db(databaseName);

  // db.collection('users').insertMany([
  //   {
  //     name:'jen',
  //     age:24
  //   }, {
  //     name:'ross',
  //     age:23
  //   }
  // ], (error, result)=> {
  //   if(error) {
  //     return console.log('error in inserting documents');
  //   } 
  //   console.log(result.ops);
  // });
  
  db.collection('tasks').insertMany([
    {
      description:'complete node basics',
      completed:true,
    }, {
      description:'complete mongo',
      completed:false,
    }, {
      description:'complete express',
      completed:false,
    }
  ], (error, result)=> {
    if(error) {
      return console.log('error in inserting documents');
    } 
    console.log(result.ops);
  });


})