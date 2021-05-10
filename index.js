const express = require('express');
const cors = require('cors');
const app = express();
const usersRoutes = require('./routes/userRoutes');
const phrasesRoutes = require('./routes/phraseRoutes');

app.use(express.json());
const allowedOrigins = ['http://localhost:3000', 'https://wizardly-borg-21ae90.netlify.app'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}))

app.use(usersRoutes)
app.use(phrasesRoutes)

module.exports = app;

