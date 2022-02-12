const router = require('express').Router();
const Person = require('../models/Person');

//create data
router.post('/', async (req, res) => {
  //req.body

  //{name: 'John', salary: 4000, approved: false}
  const {name, salary, approved} = req.body;

  //validation 
  if(!name) {
    res.status(422).json({error: 'Name is required'});
    return;
  }

  const person = {
    name,
    salary,
    approved
  }

  try {
    //create data structure
    await Person.create(person);

    res.status(201).json({message: 'Created successfully'})

  } catch (err) {
    res.status(500).json({error: err});
  }
});

//Read
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();

    res.status(200).json(people);
  }
  catch (err) {
    res.status(500).json({error: err});
  }
});

router.get('/:id', async (req, res) => {
  //extract data from request the url = req.params
  const id = req.params.id;

  try {
    const person = await Person.findOne({_id: id});

    if(!person) {
      res.status(404).json({error: 'Can not find person'})
      return;
    }

    res.status(200).json(person);
  }catch (err) {
    res.status(500).json({error: err});
  }
});

//Update - updating dadtas(PUT, PATH)
router.patch('/:id', async (req, res) => {
  const id = req.params.id;

  const { name, salary, approved} = req.body;

  const person = {
    name,
    salary,
    approved
  }
  try {
    const updatePerson = await Person.updateOne({_id: id}, person);

    if(updatePerson.matchedCount === 0) {
      res.status(422).json({message: 'User cannot be found'});
      return;
    }
    res.status(200).json(person);
  }
  catch (err) {
    res.status(500).json({error: err});
  }
});

//Delete - delete data
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const person = await Person.findOne({_id: id});

  if(!person) {
    res.status(422).json({message: 'User cannot be found'});
    return;
  }
  try {
    await Person.deleteOne({_id: id});
    res.status(200).json({message: 'User deleted with sussefull'})
  } catch (err) {
    res.status(500).json({error: err});
  }
});

module.exports = router;