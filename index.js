const express = require('express');
const cors = require('cors');
const app = express();
const usersRoutes = require('./routes/userRoutes');
const phrasesRoutes = require('./routes/phraseRoutes');

app.use(express.json());
app.use(cors())

app.use(usersRoutes)
app.use(phrasesRoutes)

module.exports = app;

