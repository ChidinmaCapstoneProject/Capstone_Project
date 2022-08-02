require('dotenv').config();
const express = require('express')
const app= express()
const cors = require('cors')
const corsOptions = require('./config/corsOptions');
const mongoose = require('mongoose');
const register = require('../capstone-express-api/routes/register');
const auth = require('../capstone-express-api/routes/auth');
const refresh = require('../capstone-express-api/routes/refresh')
const training = require('./routes/training')
const booking = require('./routes/bookings')
const verifyJWT = require('../capstone-express-api/middleware/verifyJWT')
const cookieParser = require ('cookie-parser');
const credentials = require('./middleware/credentials');
const connectDB = require('../capstone-express-api/config/dbConn')
const logout =require('../capstone-express-api/routes/logout')
const review = require('./routes/review')
const conversations = require('./routes/conversations')
const messages = require('./routes/messages')
const PORT = process.env.PORT || 3500

//connect to MongoDB
connectDB();

app.use(credentials);
app.use(cors(corsOptions));

//built in middleware for json
app.use(express.urlencoded ({extended : false}));

//built in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());


//routes
app.use ('/register', register);
app.use ('/auth', auth);
app.use ('/refresh', refresh);
app.use ('/logout', logout);
app.use('/training', training)
app.use('/booking', booking)
app.use('/review', review)
app.use('/conversations', conversations)
app.use('/messages', messages)
app.use('/placeDetails', placeDetails)


app.use (verifyJWT);


mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
      console.log(`🚀 Server listening at http://localhost:${PORT}`)
    })
})

module.exports = app;
