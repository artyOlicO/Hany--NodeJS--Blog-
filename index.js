const express= require('express');
const blogRoutes= require('./routes/blog');
const userRoutes= require('./routes/user');
const mongoose= require('mongoose');
const authMiddleware= require('./middlewares/auth');



const app= express();

// mongoose.connect('mongodb://localhost:27017/blogSystem', {useNewUrlParser: true});
const url="mongodb+srv://asd:asd@cluster0.y7wlf.mongodb.net/blogSystem?retryWrites=true&w=majority";
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://asd:asd@cluster0.y7wlf.mongodb.net/blogSystem?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


app.use(express.json());

app.use('/blog', authMiddleware, blogRoutes);
app.use('/user', userRoutes);


app.use('*', (req, res, next)=>{
    res.status(404).json({Error: 'NOT_FOUND'});
});




app.use((err, req, res, next)=> {
    if(err instanceof mongoose.Error.ValidationError){
        res.status(422).json(err.errors);
    } 
    if(err.code=== 11000){
        res.status(422).json({statusCode: 'Validation Error', property: err.keyValue});
    }
    if(err.message == 'UN_AUTHENTICATED'){
        // console.log('eeeeeeeeeeee');
        res.status(401).json({ statusCode: 'UN_AUTHENTICATED'});
    }

    
    res.status(503).end();
});




const { PORT= 3000 }= process.env;

app.listen(PORT, ()=>{
console.info('app ready on: ', PORT);
})