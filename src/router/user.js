const express = require('express')
const User = require('../model/user')
const Users = require('../model/user')
const auth = require('../middle/auth')
const multer = require('multer')
const sharp = require('sharp')
const {sendWelcomeEmail,sendCancellEmail} = require('../emails/account')
const user = new express.Router()

user.post('/user',async(req,res)=>{              // Save on Database

    const user = new Users(req.body)
   try{
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generate()
        res.status(200).send({user, token})
   }catch(e){
        res.status(404).send(e)
   }
})

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.endsWith('.pdf') && !file.originalname.match(/\.(jpg|jpeg)$/) && !file.originalname.match(/\.(doc|docx)$/) ){
            return cb(new Error ('Un supported File'))
        }
        cb(undefined, true)
    }
    
})

user.post('/user/me/avatar', auth, upload.single('avatar'), async(req, res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
    req.user.avatar=buffer
    await req.user.save()
    res.send('Upload Done')
},(error, req, res, next)=>{
    res.status(400).send({error: error.message })
})

user.delete('/user/me/avatar',auth,(req,res)=>{
    req.user.avatar = undefined
    req.user.save()
    res.send()

})

user.get('/user/:id/avatar', async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)

    }catch(e){
        res.status(404).send()
    }
})


user.post('/user/login', async(req,res)=>{
    try{
        
        const user = await User.findByCred(req.body.email, req.body.password)
        const token = await user.generate()
        res.send({user, token})
     
    }catch (e){
        res.status(400).send()
    }
})

user.post('/user/logout', auth, async(req,res)=>{

    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })

        await req.user.save()
        res.sned()
    }catch(e){
        res.status(500).send()
    }

})

user.post('/user/logoutall', auth, async(req, res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }catch (e){
        res.status(500).send(e)
    }
    
})

user.patch('/user/me', auth ,  async(req,res)=>{        // Update by id

    const updates = Object.keys(req.body)
    const allowUpdate = ['name','password']
    const isAllow = updates.every((update)=> allowUpdate.includes(update) )

    if(!isAllow){
       return res.status(404).send({error : 'inavlid Operation'})
    }

    try{
        

         updates.forEach((update)=>{
            req.user[update]=req.body[update]
         })

         await req.user.save()
        res.send(req.user)

    }catch(e){
        res.status(400).send(e)
    }

})

user.get('/user/me', auth , async (req,res)=>{          // find from database
    
    res.send(req.user)
})


// user.get('/user/:id',async (req,res)=>{          // find by id from database
    
//     const _id = req.params.id
   
//     try{
//         const user = await Users.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(400).send(e)
//     }

// })

user.delete('/user/me', auth,  async(req,res)=>{                           // Delete by id

    try{
        //  await Users.findByIdAndDelete(req.user._id)       
        // if(!user){
        //     req.status(404).send
        // }

        await req.user.remove()
        sendCancellEmail(req.user.email, req.user.name)
        res.send(req.user)

    }catch(e){
        res.status(400).send(e)
    }
})



module.exports = user

