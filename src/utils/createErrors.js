const createError = (status, message) => {
  const err = new Error();
  err.statusCode = status;
  err.message = message;

  return err;
};

export default createError;
