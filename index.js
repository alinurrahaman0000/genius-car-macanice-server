
const express = require('express')
const app = express()
const port = 5000
const { MongoClient } = require('mongodb');
const ObjectId= require('mongodb').ObjectId
const cors = require('cors')
require('dotenv').config()

//newuser
//zva8oFIENPPpxHsi

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n1b7g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    console.log('cannected to database')
    const database = client.db("myFirstDatabase");
    const servicesCollection = database.collection("services");
    // create a document to insert
    // const doc = {
    //   title: "Record of a Shriveled Datum",
    //   content: "No bytes, no problem. Just insert a document, in MongoDB",
    // }

// GET API
app.get('/services',async(req,res)=>{
  const cursor =servicesCollection.find({});
  const services =await cursor.toArray();
  res.send(services);
})

// GET SINGLE SERVISE
app.get('/services/:id',async(req,res)=>{
    const id =req.params.id;
    console.log('getting specific service',id)
    const query = {_id: ObjectId(id)};
    const service = await servicesCollection.findOne(query);
    res.json(service);
})

//POST API
app.post('/services',async(req,res)=>{
  const service =req.body;
console.log('hit the post api', service);


  //  const servise ={
  //   "name": "ENGINE DIAGNOSTIC",
  //   "price": "300",
  //   "description": "Lorem ipsum dolor sit amet, consectetu radipisi cing elitBeatae autem aperiam nequ quaera molestias voluptatibus harum ametipsa.",
  //   "img": "https://i.ibb.co/dGDkr4v/1.jpg"

  const result = await servicesCollection.insertOne(service);
  console.log(result)
     res.json(result)
   })

   app.delete('/services/:id',async(req,res)=>{
    const id = req.params.id;
    const query = {_id:ObjectId(id)};
   const result = await servicesCollection.deleteOne(query);
   res.json(result);
  })

    // const result = await haiku.insertOne(doc);
    // console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  // client.close();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
