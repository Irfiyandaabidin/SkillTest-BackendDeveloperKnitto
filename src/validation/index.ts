import Joi from 'joi';

// 09. Validasi input dengan library Joi 
const schema = Joi.object({
  name: Joi.string().required(),
  stok: Joi.number().integer().required(),
  price: Joi.number().integer().required(),
  description: Joi.string().required(),
  category_id: Joi.number().integer().required(),
  id: Joi.number().integer()
});

export default schema