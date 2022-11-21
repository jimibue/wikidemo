const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path")
const layout = require('./views/layout')
const wikiRouter = require('./routes/wiki')
const usersRouter = require('./routes/users')

// logging/dev tool
app.use(morgan("dev"))

// setup public dir //loading css, images, statics files
// no stuff in public folder is visible
app.use(express.static(path.join(__dirname, "public")))

// 
app.use(express.urlencoded({extended:false}))

app.use("/wiki", wikiRouter)
app.use("/users", usersRouter)

app.get('/',(req,res)=>{
    res.send(layout('<h1>yo</h1>'))
})



module.exports = app;