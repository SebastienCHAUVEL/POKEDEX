export const addResponseMethodsMiddleware = (req, res, next) => {
  // Standard success response
  res.success = (data) => res.json({ data, meta: { total: data.length ?? 1 } });
  next();
};
