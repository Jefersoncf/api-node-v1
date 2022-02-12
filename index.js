const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

//JSON / middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//router api
const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes);

//rota inicial/endepoint
app.get('/', (req, res) => {
  res.json({ message: 'Hello World'})
})

app.listen(3000, () => {
  console.log('Runing in here!');
})

const conexao = process.env.dbconexao || 400;
mongoose.connect(conexao, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conected in mongodb');
  })
  .catch((err) => console.log(err));