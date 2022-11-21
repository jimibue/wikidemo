const express = require('express')
const router = express.Router()
const {main,addPage} = require('../views')
const {Page, User} = require('../model')

// get => /wiki
router.get('/', async(req,res,next)=>{
    // grab my users
    let pages = await Page.findAll()
    console.log('pages:', pages)
    //
    // res.json(users)
    res.send(main(pages))
})

// get => /wiki/add
router.get('/add', async(req,res,next)=>{
    res.send(addPage())

})

// post => /wiki
router.post('/', async (req,res,next)=>{
    // req.body is the stuff from the form
    // we need the stuff on the form
        // array descructoring 
        try{
        const [user, wasCreated] = await User.findOrCreate({
            where:{
                name:req.body.name,
                email:req.body.email
            }
        })
        const page = await Page.create({...req.body})
        // this sets the authorId column in our page table
        page.setAuthor(user);
        res.json({user, page, wasCreated})
    }catch(err){
        next(err)
    }
    
})

// before we save are page we need to create a slug


  

// get -> getting data
// post -> create data
// put -> update data
// delete -> delete data


module.exports = router;