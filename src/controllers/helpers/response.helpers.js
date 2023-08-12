export const sendSuccessResponse = async (res, data, status = 200) => {
  if (data?.current_page) {
    return res.status(status).send({ status: 'OK', ...data })
  }
  return res.status(status).send({ status: 'OK', data })
}

export const sendErrorResponse = async (res, error) => {
  const status = error?.status ?? 500
  const message = error?.message ?? error
  res.status(status).send({ status: 'FAILED', data: { error: message } })
}
