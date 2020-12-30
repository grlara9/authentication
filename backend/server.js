const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');

const PORT = 3000;


app.use('/api/places', placesRoutes); 

app.use('/api/users', usersRoutes);

app.listen(PORT, ()=>{
    console.log("Listeningon port " + PORT)
});