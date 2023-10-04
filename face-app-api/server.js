const express = require('express');

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
        client: 'pg',
        connection: {
        host: '127.0.0.1',
        port : '5433',
        user: 'girts',
        password: '1234',
        database: 'smart-brain'
}
})




app.use(bodyParser.json());
app.use(cors());



app.get('/', (req, res) => {
    res.json(db.users);
});

// signin --> POST = success/fail

app.post('/signin', signin.handleSignin(db, bcrypt));

// register --> POST = success/fail

app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt)});

// profile, userid --> GET = user

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)} );
// image --> PUT --> user

app.put('/image/:id', (req, res) => {image.handleImagePut(req, res, db)} )

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)} )


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});


