const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();
const PORT = 3000;


app.use('/api/places', placesRoutes); 

app.use('/api/users', usersRoutes);



mongoose
  .connect('mongodb+srv://manu:academind123@cluster0-ntrwp.mongodb.net/places?retryWrites=true&w=majority')
  .then(() => {
    app.listen(PORT, ()=>{
        console.log("Listeningon port " + PORT)
  })
})

  .catch(err => {
    console.log(err);
  });

