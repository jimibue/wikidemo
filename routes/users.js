const express = require('express')
const router = express.Router()
const {userList} = require('../views')
const {Page, User} = require('../model')

// get => /users
router.get('/', async(req,res,next)=>{
    // grab my users
    let users = await User.findAll()
    console.log('users:', users)
    //
    // res.json(users)
    res.send(userList(users))
})

module.exports = router;