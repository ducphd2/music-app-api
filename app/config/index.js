const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../../constants');
const User = require('../models/user.model');

const generatePassword = async (str) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(str, saltRounds);
  return passwordHash;
};

const generateToken = (username, uid) => {
  const userForToken = {
    username: username,
    id: uid,
  };

  const token = jwt.sign(userForToken, SECRET, { expiresIn: 60*60*24 });
  return token;
};

const renderPage = (req, res) => (successMessage, errorMessage, url, otherFields = {}) => {
  req.flash("successMessage", successMessage || "");
  req.flash("errorMessage", errorMessage || "");
  for (const key in otherFields) {
    req.flash(key, otherFields[key]);
  }
  return res.redirect(url);
};

const removeVietnameseFromString = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  str = str.toLowerCase();
  str = str
    .replace(/[&]/g, "-and-")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/[-]+/g, "-")
    .replace(/-$/, "");
  return str;
}

const initDb = async () => {
  const password = await generatePassword('123');
  const user = new User({
    username: 'nguyenvantuan',
    password,
  })

  user.save();
}

const obj = {
  generatePassword,
  generateToken,
  renderPage,
  removeVietnameseFromString,
  initDb,
};

module.exports = obj;
