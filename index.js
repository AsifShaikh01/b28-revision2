const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const {userRouter} = require("./routes/User.routes");
const {connection} = require("./config/db");

const app = express();

app.use(express.json());
app.use("/api",userRouter)

app.listen(process.env.PORT , async ()=>{
    try {
        await connection;
        console.log("connected to the database!!")
    } catch (error) {
        console.log("cannot connect to the database??")
    }
    console.log(`server is running at port ${process.env.PORT}`)
})