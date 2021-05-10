const catchAsync = require('../utils/catchAsync');
const phrasesModel = require('../infra/models/phraseModel');
const phrasesHelper = require('../helpers/phraseHelpers');
const usersModel = require('../controllers/usersController');

getAll = catchAsync(async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if(!apiKey) return res.status(401).send({ auth: false, message: 'No Key provided.' });
  if(apiKey !== process.env.APIKEY) return res.status(401).send({ auth: false, message: 'Failed to authenticate Key.' });

  const response = await phrasesHelper.getAll(await phrasesModel.aggregate([
    { $lookup:
      {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: '$user' },
  ]))


  return res.status(200).json({
    statusCode: 200,
    message: 'success',
    data: response
  });
});

deletePhrase = catchAsync(async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if(!apiKey) return res.status(401).send({ auth: false, message: 'No Key provided.' });
  if(apiKey !== process.env.APIKEY) return res.status(401).send({ auth: false, message: 'Failed to authenticate Key.' });

  const id = req.params.id || ''

  const doesExist = await phrasesModel.exists({_id: id});

   if (doesExist === false) {
     return res.status(404).json({
      statusCode: 404,
      message: 'not found',
      data: { message: 'Frase não encontrada ou já excluida' },
    });
   };

   await phrasesModel.deleteOne({_id: id})

   return res.status(200).json({
    statusCode: 200,
    message: 'success',
    data: { message: 'Frase excluida com sucesso!!' },
  });
});


getById = catchAsync(async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if(!apiKey) return res.status(401).send({ auth: false, message: 'No Key provided.' });
  if(apiKey !== process.env.APIKEY) return res.status(401).send({ auth: false, message: 'Failed to authenticate Key.' });

  const id = req.params.id || ''
  
  const doesExist = await phrasesModel.exists({_id: id});

   if (doesExist === null) {
     return res.status(404).json({
      statusCode: 404,
      message: 'not found',
      data: { message: 'Frase não encontrada' },
    });
   };

   const response = await phrasesHelper.getById(phrasesModel.getById(id));

   return res.status(200).json({
    statusCode: 200,
    message: 'success',
    data: response,
  });
})


create = catchAsync(async (req,res) => {
  const apiKey = req.headers['x-api-key'];
  if(!apiKey) return res.status(401).send({ auth: false, message: 'No Key provided.' });
  if(apiKey !== process.env.APIKEY) return res.status(401).send({ auth: false, message: 'Failed to authenticate Key.' });

  if(req.body.user_id == '') {
    return res.status(409).json({
      statusCode: 409,
      message: 'conflict',
      data: { message: 'Usuário não informado' },
      auth: false,
    });
  }

  const doesPhraseExist = await phrasesModel.exists({ phrase: req.body.phrase });

  if(doesPhraseExist === true) {
    return res.status(409).json({
      statusCode: 409,
      message: 'conflict',
      data: { message: 'Frase já cadastrada' },
      auth: false,
    });
  }

  await phrasesModel.create({
    phrase: req.body.phrase,
    user: req.body.user_id
  })

  return res.status(200).json({
    statusCode: 200,
    message: 'success',
    data: { message: 'Frase criada com sucesso!!' },
    auth: true,
  });
})


module.exports = {
  getAll,
  deletePhrase,
  create,
  getById
}