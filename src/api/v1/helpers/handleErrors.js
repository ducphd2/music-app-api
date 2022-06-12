const handleHTTPError = (res, message, code = 403) => {
  res.status(code).json({ error: message });
};

module.exports = { handleHTTPError };
