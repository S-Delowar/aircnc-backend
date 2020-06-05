const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const port = process.env.PORT;
const uri = process.env.DB_PATH;
//console.log(uri)

app.get('/', (req, res) => {
    res.send('Welcome to my api');
})


app.post('/addHouse', (req, res) => {
    const house = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("AirCNC").collection("houses");
        collection.insert(house, (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        //client.close();
      });
});

app.get('/houses', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("AirCNC").collection("houses");
        collection.find().toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
        });
        client.close();
      });
});

app.get('/houses/:id', (req, res) =>{
    const houseId = Number(req.params.id);    
    
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("AirCNC").collection("houses");
        collection.find({id: houseId}).toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents[0]);
                console.log(documents[0])
            }
        });
        client.close();
      });
});

app.post('/checkout', (req, res) => {
    const checkoutInfo = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("AirCNC").collection("checkouts");
        collection.insert(checkoutInfo, (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        //client.close();
      });
});




//post experiences to database
app.post('/addExperience', (req, res) => {
    const house = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("AirCNC").collection("experiences");
        collection.insert(house, (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        //client.close();
      });
});



//get experiences from database
app.get('/experiences', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("AirCNC").collection("experiences");
        collection.find().toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
        });
        client.close();
      });
});


//post homes to database for homePage
app.post('/addHome', (req, res) => {
    const house = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("AirCNC").collection("homes");
        collection.insert(house, (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        //client.close();
      });
});


//get homes for homePage from database
app.get('/homes', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("AirCNC").collection("homes");
        collection.find().toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
        });
        client.close();
      });
});


app.listen(port, () => {
    console.log(`We are live on port ${port}`);
})