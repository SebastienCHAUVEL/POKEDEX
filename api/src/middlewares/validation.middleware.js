export const validate = (dataSource, schema) => {
  return async (req, res, next) => {
    // req[dataSource] => req.body  or req.params or req.query...
    await schema.validateAsync(req[dataSource], { abortEarly: false });
    next();
  };
};
