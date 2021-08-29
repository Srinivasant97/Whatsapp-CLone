const express = require('express');
const mongoose = require('mongoose');
const Db = require('./dbMessages')
const Pusher = require("pusher");
const cors = require('cors')

const app =express()


const pusher = new Pusher({
  appId: "1225611",
  key: "393341fdbd200ec0276d",
  secret: "2f2e67d96fd653043662",
  cluster: "ap2",
  useTLS: true
});
app.use(express.json());
app.use(cors());
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
});

const url = "mongodb+srv://user-admin:G3wKYNKpoRsKfSaM@cluster0.fy4fq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(()=>console.log("Mongoose Connected"))
.catch((err)=>console.log(err))

const a=mongoose.connection

a.on('open',()=> {
    console.log("Connected");
    const msgcollection = a.collection("messages");
    const changes = msgcollection.watch();
    changes.on("change",(change) =>{
        if (change.operationType == 'insert'){
            const Details = change.fullDocument;
            pusher.trigger('messag','inserted',{
                name:Details.name,
                message: Details.message,
                timestamp:Details.timestamp,
                received:Details.received,
            });

        }else{
            console.log("Error ")
        }
       
    })

})

app.get('/',(req,res)=>{
    res.send("Hello")
})

app.get('/messages/sync',(req,res)=>{
    Db.find((err,data)=>{
        if (err){
            res.status(500).send(err)
        }else{
            res.send(data)
        }
    })
})

app.post('/messages/new', (req,res)=>{
    const Message = req.body
    Db.create(Message ,(err,data)=>{
        if (err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })

})

app.listen(9000,()=>{console.log("Server Started")})