const app = require('./index')
const set_env = require('./env/set_env');
require('dotenv').config({ path: `./env/config.${set_env.set}.env` });
require('./infra/mongo');

app.listen(process.env.PORT || 2023, () => {
  console.log(`click-fiscal-api is running at port ${process.env.PORT || 2023}`)
})

app.get('*', (req, res) => {
  return res.status(400).json({ statusCode: 400, message: `Não encontramos ${req.originalUrl} no servidor!` });
});