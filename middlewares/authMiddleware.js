const catchAsync = require('../utils/catchAsync');
const jwt = require("jsonwebtoken");

verifyTokens = catchAsync(async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if(!apiKey) return res.status(401).send({ auth: false, message: 'No Key provided.' });

  jwt.verify(apiKey, process.env.APIKEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    
    req.userId = decoded.id;
    next();
  });
});

module.exports = verifyTokens;