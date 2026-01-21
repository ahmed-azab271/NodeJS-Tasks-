const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors")
require("dotenv").config() // after that line we can access the data in .env through (process.env)



const userRouter = require("./Router/user")
const postRouter = require("./Router/post")

const app =  express()

// app level middleware
app.use(express.json());
app.use(cors());    

// routers
app.use('/users', userRouter);
app.use("/posts" ,postRouter)

const Port = process.env.PORT

app.listen(Port, () => {
    mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`).then(() => {
        console.log('✅ Connected to MongoDB')
    }).catch((err) => {
        console.log('❌ Connected to MongoDB')
        console.log(err)
    });
    console.log(`✅ Server is running on Port:${Port}`);
});