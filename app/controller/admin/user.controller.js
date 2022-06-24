const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { generateToken, renderPage } = require('../../config');
const User = require('../../models/user.model');

// res -> response
router.get("/", (req, res, next) => {
  // res.cookie("Authorization", '');
  return res.render("Login", {
    errorMessage: req.flash("errorMessage"),
    username: req.flash("username"),
    password: req.flash("password"),
  });
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
      renderPage(req, res)('', "Vui lòng nhập tên đăng nhập và mật khẩu!", '/dang-nhap', req.body);
      return;
  }
  // ?. chaning optional
  const user = await User.findOne({ 'username': username });
  const id = user?._id.valueOf();
  const passwordCorrect = user && await bcrypt.compare(password, user.password) || false;
  if (!user || !passwordCorrect) {
    return renderPage(req, res)('', "Sai tên đăng nhập hoặc mật khẩu", '/dang-nhap', req.body);
  }
  const accessToken = generateToken(username, id);
  res.cookie("Authorization", `bearer ${accessToken}`);
  return res.redirect('/auth/bai-hat');
});


module.exports = router;
