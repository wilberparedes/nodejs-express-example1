const boom = require('@hapi/boom');

/** PROPERTY Y schema sacados de los request
 * se usa el closures https://www.youtube.com/watch?v=JXG_gQ0OF74
 */
function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = validatorHandler;
