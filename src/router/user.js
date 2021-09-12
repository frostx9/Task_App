const express = require('express')
const User = require('../model/user')
const Users = require('../model/user')
const auth = require('../middle/auth')
const user = new express.Router()

user.post('/user',async(req,res)=>{              // Save on Database

    const user = new Users(req.body)
   try{
        await user.save()
        const token = await user.generate()
        res.status(200).send({user, token})
   }catch(e){
        res.status(404).send(e)
   }
})

user.post('/user/login', async(req,res)=>{
    try{
        
        const user = await User.findByCred(req.body.email, req.body.password)
        const token = await user.generate()
        res.send({user, token})
        // res.send(user)
    }catch (e){
        res.status(400),send()
    }
})

user.patch('/user/:id', async(req,res)=>{        // Update by id

    const updates = Object.keys(req.body)
    const allowUpdate = ['name','password']
    const isAllow = updates.every((update)=> allowUpdate.includes(update) )

    if(!isAllow){
       return res.status(404).send({error : 'inavlid Operation'})
    }

    try{
        const user = await Users.findById(req.params.id)

         updates.forEach((update)=>{
            user[update]=req.body[update]

         })

         await user.save()


        // const user = await Users.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }

})

user.get('/user', auth , async (req,res)=>{          // find from database
    
    try{    
        const user = await Users.find({})
        res.status(200).send(user)
    }catch(e){
        res.status(404).send(e)
    }
})






user.get('/user/:id',async (req,res)=>{          // find by id from database
    
    const _id = req.params.id
   
    try{
        const user = await Users.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }

})

user.delete('/user/:id', async(req,res)=>{                           // Delete by id

    try{
        const user = await Users.findByIdAndDelete(req.params.id)       
        if(!user){
            req.status(404).send
        }
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})



module.exports = user