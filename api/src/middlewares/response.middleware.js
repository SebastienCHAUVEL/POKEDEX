import { StatusCodes } from "http-status-codes";

export const addResponseMethodsMiddleware = (req, res, next) => {
  // Standard success response
  res.success = (data) => res.json({ data, meta: { total: data.length ?? 1 } });
  res.created = (data) =>
    res
      .status(StatusCodes.CREATED)
      .json({ data, meta: { total: data.length ?? 1 } });
  res.deleted = () => res.status(StatusCodes.NO_CONTENT).end();

  next();
};
