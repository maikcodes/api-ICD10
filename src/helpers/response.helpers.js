export const sendSuccessResponse = async (res, data, status = 200) => {
  res.status(status).send({ status: "OK", data: data });
};

export const sendErrorResponse = async (res, error) => {
  const status = error?.status ?? 500;
  const message = error?.message ?? error;
  res.status(status).send({ status: "FAILED", data: { error: message } });
};
