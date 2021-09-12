const express = require('express')
const Task = require('../model/task')
const task = new express.Router()




task.post('/task',async(req,res)=>{

    const task = new Task(req.body)
    try{
        const task1 = await task.save()
        res.status(202).send(task1)
    }catch (e){
      res.status(400).send(e)
    } 
  })
  
  task.patch('/task/:id', async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowUpdate = ['description']
    const isvalid = updates.every((update)=>allowUpdate.includes(update))

    if(!isvalid){
        res.status(404).send()
    }
  
      try{

        
          const task = await Task.findById(req.params.id)
            updates.forEach((update)=>{
                task[update] = req.body[update]
            })  
            await task.save()

          if(!task){
              return res.status(404).send()
          }
          res.send(task)
  
      }catch (e){
          res.status(404).send(e)
      }
  })
  
  task.get('/task', async(req,res)=>{
  
      try{
          const task = await Task.find({})
          res.status(200).send(task)
      }catch (e){
          res.status(400).send(e)
      }
  
  })
  
  
  task.get('/task/:id',async (req,res)=>{
  
      const _id = req.params.id
      try{
          const task = await Task.findById(_id)
          if(!task){
              return res.status(400).send()
          }
          res.send(task)
      }catch (e){
          res.status(404).send(e)
      }
     
  })
  
  task.delete('/task/:id', async(req,res)=>{                           // Delete by id
  
      try{
          const task = await Task.findByIdAndDelete(req.params.id)       
          if(!task){
              req.status(404).send
          }
          res.send(task)
      }catch(e){
          res.status(400).send(e)
      }
  })
  
  module.exports= task