// CRUD operations
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = "task-manager";

// const  id = new ObjectID()

MongoClient.connect(connectionUrl, {useNewUrlParser:true}, (error, client) => {
  if(error) {
    return console.log('unable to connect to db')
  }
  // console.log('connected correctly')
  const db = client.db(databaseName);


  db.collection('tasks').updateMany({
    completed:false
  }, {
    $set:{
      completed:true,
    }
  }).then(result => {
    console.log(result);
  }).catch(error => {
    console.log(error);
  })


  // db.collection('users').updateOne({
  //   _id:new ObjectID("5d7486bba0a0482c3d31b90e")
  // }, {
  //   $set:{
  //     name:'Rachael'
  //   }
  // }).then(result => {
  //   console.log(result);
  // }).catch(error => {
  //   console.log(error);
  // })

  // db.collection('tasks').findOne({_id:new ObjectID("5d7487ceaf84402ce4523ee4")}, (error, task) => {
  //   if(error) {
  //     console.log('error in getting data')
  //   } else {
  //     console.log(task)
  //   }
  // })

  // db.collection('tasks').find({completed:false}).toArray((error, tasks) => {
  //   if(error) {
  //     console.log('error in getting data')
  //   } else {
  //     console.log(tasks)
  //   }
  // })
  
  

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
  
  // db.collection('tasks').insertMany([
  //   {
  //     description:'complete node basics',
  //     completed:true,
  //   }, {
  //     description:'complete mongo',
  //     completed:false,
  //   }, {
  //     description:'complete express',
  //     completed:false,
  //   }
  // ], (error, result)=> {
  //   if(error) {
  //     return console.log('error in inserting documents');
  //   } 
  //   console.log(result.ops);
  // });


})