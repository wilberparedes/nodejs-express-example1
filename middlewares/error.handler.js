/** funcion para loguear errores */
function logErrors(error, req, res, next) {
  console.error(error);
  next(error);
}

/**
 * detecta error pero crea un formato para devolverlo al cliente
 * aunque no se esté usando next se debe poner porque de esta forma es que
 * se detecta que es un middleware de tipo error, debe tener los 4 parametros
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
}

function boomErrorHandler(error, req, res, next) {
  if (error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  }
  next(error);
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
