const express=require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
const path =require('path');

const cors= require('cors');
const app=express();
const route=require('./routes/api');

//Serve Static if in production
if(process.env.NODE_ENV==='production'){
    //set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    });
}


const port =process.env.PORT||8080
const db = require('./config/keys').mongoURI;


// Connect to Mongo
mongoose
  .connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true,
     useUnifiedTopology: true 
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));




app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());

app.use(morgan('tiny'));
app.use('/api',route);

app.listen(port,console.log(`server starting at ${port}`));