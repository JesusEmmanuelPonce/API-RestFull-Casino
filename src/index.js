const express = require('express');
const app = express();
const routes = require('./routes');

//Connect a bd
const db = require('./config/db');

//Models
require('./models/Usuarios');
require('./models/Preguntas');
require('./models/Apuestas');

//Create DB
db.sync()
.then(() => console.log('conectado'))
.catch(error => console.log(error))


//Settings
app.set('port', process.env.PORT || 3000);

//Middleware
app.use(express.json());

//Routes
app.use('/', routes());


app.listen(app.get('port'), () => {
    console.log('On port', app.get('port'));
})
