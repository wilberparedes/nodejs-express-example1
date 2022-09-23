const Joi = require('joi');
/** DOCUMENTACIÓN: https://joi.dev/api/?v=17.6.1#number */
/** PERSONALIZAR MENSAJES DE LA VALIDACION
 * const name = joi.string().min(3).max(15).messages({
 * 'string.base': `" nombre "debe ser un tipo de 'texto'`,
 * 'string.empty': `"nombre "no puede ser un campo vacío`,
 * 'string.min': `"nombre" debe tener una longitud mínima de {#limit}`,
 * 'string.max': `"nombre" debe tener una longitud máxima de {#limit}`
 * });
 * ANOTACION
 * Consejo: pongan en las validaciones de price: .strict()
 * ya que sino aceptará strings con números como “1000” y eso
 * puede generarnos problemas después.
 * EJEMPLO CON REGEX:
 * const lastName = Joi.string().min(2).max(50).regex(/^\w+(?:\s+\w+)*$/)
 * .messages({"string.pattern.base": "Last Name accepts alphabetic characters, numbers and spaces" });
 */
const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

const updateProductSchema = Joi.object({
  name,
  price,
  image,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
