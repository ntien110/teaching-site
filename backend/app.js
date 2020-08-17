const express = require("express")
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser")
const mongooseConnect = require("./helper/mongoDb")
const methodOverride = require('method-override');

const cors = require("cors")
require("dotenv/config")

var whitelist = ['http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions = {credentials: true};
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions.origin = true  // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions.origin = true//false // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

const app = express()

var lauchServer = () => {
    // Apply middlewares
    app.use(cors(corsOptionsDelegate));
    app.use((req, res, next) => {
        console.log(`A ${req.method} request to path ${req.path} from ${req.hostname}`)
        next()
    })
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(cookieParser())

    // Apply routes
    const userRoute = require("./routes/user")
    const fileRoute = require("./routes/file")
    const subjectRoute = require("./routes/subject")
    const blogRoute = require("./routes/blog")
    // const test = require("./routes/test")
    app.use("/api/user", userRoute)
    app.use("/api/file", fileRoute)
    app.use("/api/subject", subjectRoute)
    app.use("/api/blog", blogRoute)
    //app.use("/test", test)

    // test api
    app.route("/")
        .get((req, res) => {
            res.cookie("test", "somevalue")
            res.send("success!!!")
        })


    app.listen(process.env.PORT, ()=>{
        console.log("Server started!")
    });
}

mongooseConnect.startConnectionToDb(lauchServer)