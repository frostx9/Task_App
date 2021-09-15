const express = require('express')
const Task = require('../model/task')
const auth = require('../middle/auth')
const task = new express.Router()




task.post('/task',auth, async(req,res)=>{

    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id

    })
    try{
        const task1 = await task.save()
        res.status(202).send(task1)
    }catch (e){
      res.status(400).send(e)
    } 
  })
  
  task.patch('/task/:id', auth, async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowUpdate = ['description']
    const isvalid = updates.every((update)=>allowUpdate.includes(update))

    if(!isvalid){
        res.status(404).send()
    }
  
      try{

        
          const task = await Task.findOne({_id:req.params.id, owner:req.user._id})

          if(!task){
            return res.status(404).send()
        }
            updates.forEach((update)=>{
                task[update] = req.body[update]
            })  
            await task.save()

         
          res.send(task)
  
      }catch (e){
          res.status(404).send(e)
      }
  })
  
  task.get('/task',auth, async(req,res)=>{

        const match = {}
        if(req.query.completed){
            match.completed = req.query.completed ==='true'
        }
  
      try{
        //   const task = await Task.find({owner:req.user._id})
        await req.user.populate({
            path:'tasks',
            match
        })
        res.send(req.user.tasks)

          
      }catch (e){
          res.status(400).send(e)
      }
  
  })
  
  
  task.get('/task/:id',auth, async (req,res)=>{
  
      const _id = req.params.id

      try{
          
          const task = await Task.findOne({_id, owner:req.user._id})
          if(!task){
              return res.status(400).send()
          }
          res.send(task)
      }catch (e){ 
          res.status(404).send(e)
      }
     
  })
  
  task.delete('/task/:id',auth, async(req,res)=>{                           // Delete by id
  
      try{
          const task = await Task.findOneAndDelete({_id:req.params.id, owner: req.user_.id})       
          if(!task){
              req.status(404).send
          }
          res.send(task)
      }catch(e){
          res.status(400).send(e)
      }
  })
  
  module.exports= task