const express = require("express")
const mongoose = require("mongoose")
var cookieParser = require('cookie-parser')
require("dotenv/config")

const app = express()

// Apply middlewares
app.use((req,res,next)=>{
    console.log(`A ${req.method} request to path ${req.path} from ${req.hostname}`)
    next()
})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

// Apply routes
const userRoute = require("./routes/user")
const test = require("./routes/test")
app.use("/user", userRoute)
app.use("/test", test)

// Connect to database
mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true,useUnifiedTopology: true },
    ()=>{console.log("connected to database")}
)
mongoose.connection.on("error",(err)=>{
    console.log(err)
})

// test api
app.route("/")
    .get((req, res)=>{
        res.send("success!!!")
    })


app.listen(process.env.PORT);