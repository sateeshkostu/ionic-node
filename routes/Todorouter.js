const express = require('express');
const mongoose = require('mongoose');
const ionicTodo = require('../models/todoschema');
const router = express.Router();

const app = express();
//express is an backend web application framework for nodejs

//Get all todos
router.get('/gettodos', async (req, res) => {  //// async makes a function return a Promise
    try {
        const todos = await ionicTodo.find({})  
        //await makes a function wait for a Promise
        res.status(200).json({ todos })
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})


//get id by todo
router.get('/todos/:useremail', (req, res) => {
    ionicTodo.findOne({useremail:req.params.useremail})
        .then(Todo => res.json(Todo))
        .catch(err => res.status(400).json(`Error: ${err}`));
})

//post a new todo
router.post('/newtodos', async (req, res) => {
    const newTodo = new ionicTodo({
      useremail:req.body.useremail,
      name:req.body.name,
      Duration:req.body.Duration,
      Startdate:req.body.Startdate,
      Enddate:req.body.Enddate
    });
    try {
      await newTodo.save();
      res.status(200).json({ message: 'Todo added' });
    } catch (error) {
      res.status(400).json({ error });
    }
  });

//update a todo
router.put('/updatetodos/:id', (req, res) => {
    ionicTodo.findByIdAndUpdate(req.params.id, req.body)  //params means parameter value
        .then(() => res.json('todo updated'))
        .catch(err => res.status(400).json(`Error: ${err}`));

})

//ddelete a todo
router.delete('/deletetodos/:id', (req, res) => {
    ionicTodo.findByIdAndDelete(req.params.id)  //params means parameter value
        .then(() => res.json('Todo deleted'))
        .catch(err => res.status(400).json(`Error: ${err}`));

})



module.exports = router;