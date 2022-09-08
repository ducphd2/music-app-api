export const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      // Handle without authorization
    }

    // eslint-disable-next-line callback-return
    next()
  } catch (error) {
    // Handle error
  }
}
