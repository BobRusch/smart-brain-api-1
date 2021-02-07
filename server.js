const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./controllers/authorization');
const signOut = require('./controllers/signOut');

//Database Setup
const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI, 
  log: {
   warn(message) {
   },
   error(message) {
   },
   deprecate(message) {
   },
   debug(message) {
   },
 }
});

const app = express();

const whitelist = ['http://localhost:3050']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/signin', signin.signinAuthentication(db, bcrypt))
app.post('/signOut',  auth.requireAuth, (req, res) => signOut.signOut(req, res));
app.post('/register', register.registerAuthentication(db, bcrypt))
app.get('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res, db)})
app.post('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileUpdate(req, res, db)})
app.put('/image', auth.requireAuth, (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', auth.requireAuth, (req, res) => { image.handleApiCall(req, res)})

app.listen(3000, ()=> {
  console.log('Smart Brain API Server is running on port 3000');
})
