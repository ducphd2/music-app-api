const jwt = require('jsonwebtoken');
const { renderPage } = require('..');
const { SECRET } = require('../../../constants');
const User = require('../../models/user.model');

const unknownEndpoint = (request, response) => {
  return renderPage(request, response)('', '', '/dang-nhap');
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  const { path } = request;
  if (error.name === 'CastError') {
    return renderPage(request, response)('', 'Có lỗi xảy ra. Vui lòng liên hệ admin!', '/dang-nhap');
  } else if (['JsonWebTokenError', 'TokenExpiredError'].includes(error.name)) {
    return renderPage(request, response)('', 'Phiên đăng nhập hết hạn', '/dang-nhap');
  }else if (error.name === 'SequelizeUniqueConstraintError') {
    const { message, value } = error.errors[0];
    return renderPage(request, response)('', `Vui lòng kiểm tra các trường dữ liệu: ${message} - ${value}`, path);
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.cookies["Authorization"];
  // token format: bearer xxx
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    req.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (req, res, next) => {
  const { token } = req;
  const decodedToken = token && jwt.verify(token, SECRET);
  if (!token || !decodedToken.id) {
   
    return renderPage(req, res)('', 'Vui lòng đăng nhập', '/dang-nhap');
  }
  const user = await User.findById(decodedToken.id);
  req.user = user;
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};