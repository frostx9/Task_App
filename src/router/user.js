const express = require('express')
const Users = require('../model/user')
const user = new express.Router()

user.post('/user',async(req,res)=>{              // Save on Database

    const user = new Users(req.body)
   try{
        await user.save()
        res.status(200).send(user)
   }catch(e){
        res.status(404).send(e)
   }
})

user.patch('/user/:id', async(req,res)=>{        // Update by id

    const updates = Object.keys(req.body)
    const allowUpdate = ['name']
    const isAllow = updates.every((update)=> allowUpdate.includes(update) )

    if(!isAllow){
       return res.status(404).send({error : 'inavlid Operation'})
    }

    try{
        const user = await Users.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }

})

user.get('/user',async (req,res)=>{          // find from database
    
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