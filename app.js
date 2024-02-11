const express = require('express');
const connectDB = require('./db/db');
require('dotenv').config({path:'./config.env'});
const cors = require('cors');
const authRouter = require("./routes/authRouter")

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

app.get("/sample", (req,res)=>{
    res.send("API HIT!!!");
});


//connectDB
connectDB();

//middleware

//routes
app.use(express.json());

//connect app
app.use("/api/auth",authRouter)


app.listen(PORT, ()=>console.log(`Server is running on PORTTT ${PORT}`));