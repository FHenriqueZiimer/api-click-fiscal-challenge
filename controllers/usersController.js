const catchAsync = require('../utils/catchAsync');
const usersModel = require('../infra/models/usersModel');
const usersHelper = require('../helpers/usersHelpers');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

getAll = catchAsync(async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if(!apiKey) return res.status(401).send({ auth: false, message: 'No Key provided.' });
  if(apiKey !== process.env.APIKEY) return res.status(401).send({ auth: false, message: 'Failed to authenticate Key.' });

  const response = await usersHelper.getAll(await usersModel.find())
  
    return res.status(200).json({
      statusCode: 200,
      message: 'success',
      data: response
    });
})

login = catchAsync(async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if(!apiKey) return res.status(401).send({ auth: false, message: 'No Key provided.' });
  if(apiKey !== process.env.APIKEY) return res.status(401).send({ auth: false, message: 'Failed to authenticate Key.' });

  const user = await usersModel.findOne({
    email: req.body.email,
  });

  if (user === null) return res.status(404).send({
    statusCode: 404,
    message: 'Not Found',
    data: {
      message: 'Email não cadastrado'
    }
  });
   
  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

  if (!passwordIsValid) return res.status(401).send({
    statusCode: 401,
    message: 'Unauthorized',
    data: {
      message: 'Senha inválida',
      auth: false,
    }
  });

  return res.status(200).json({
    statusCode: 200,
    message: 'success',
    data: usersHelper.getById(user),
    auth: true,
  });
});

create = catchAsync(async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if(!apiKey) return res.status(401).send({ auth: false, message: 'No Key provided.' });
  if(apiKey !== process.env.APIKEY) return res.status(401).send({ auth: false, message: 'Failed to authenticate Key.' });

  const doesUserExist = await usersModel.exists({ email: req.body.email });

  if(doesUserExist === true) {
    return res.status(409).json({
      statusCode: 409,
      message: 'conflict',
      data: { message: 'Email já cadastrado, por favor use outro email' },
      auth: false,
    });
  }

  let hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
  const insertUser = await usersHelper.create(req.body, hashedPassword);
  
  const token = jwt.sign({ id: insertUser.id }, process.env.APIKEY, { expiresIn: 86400 });

  await usersModel.create(insertUser)

  return res.status(200).json({
    statusCode: 200,
    message: 'success',
    data: { message: 'Usuário criado com sucesso!!' },
    auth: true,
    token: token
  });

})

getById = catchAsync(async (req, res) => {
  const id = req.params.id || ''
  
  const data = await usersModel.findById(id);

   if (data === null) {
     return res.status(404).json({
      statusCode: 404,
      message: 'not found',
      data: { message: 'Usuário não encontrado' },
    });
   };

   const response = await usersHelper.getById(data);

   return res.status(200).json({
     statusCode: 200,
     data: response
   });
})




module.exports = {
  getAll,
  create,
  login,
  getById
}