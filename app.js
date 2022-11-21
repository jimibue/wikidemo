const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path")
const layout = require('./views/layout')

// logging/dev tool
app.use(morgan("dev"))

// setup public dir //loading css, images, statics files
// no stuff in public folder is visible
app.use(express.static(path.join(__dirname, "public")))

// WE ARE NOT USING THIS
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.send(layout('<h1>yo</h1>'))
})



module.export = app;