const express=require("express");
const app=express();
const port=5000;
const todos=require("./routes/Todos");
require('dotenv').config();
const connectDB=require('./connect/connect');
app.use(express.json())
app.use("/api/v1/todos",todos);
app.use(express.static("../public"))




const run=async()=>{
    try {
        await connectDB(process.env.MONGO_DATA);
    app.listen(port,console.log(`server is listening to the port ${port}`));
    }catch(err) {
        console.log(err);
    }
    
}


run();






