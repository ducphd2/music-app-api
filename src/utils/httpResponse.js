export const ok = (res, okStatusCode, data) => res.status(okStatusCode).json(data)
export const failed = (res, failedStatusCode, error) => res.status(failedStatusCode).json({ error })
