const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  dbName: 'clickFiscal',
  useUnifiedTopology: true
})
.then(() => console.log('Connection at database has been established successfully.'))
.catch(err => console.error('Unable to connect to the database:', err));

mongoose.set('useFindAndModify', false);

module.exports = mongoose;