const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const generatePassword = async (str) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(str, saltRounds)
  return passwordHash
}

const generateToken = (username, uid) => {
  const userForToken = {
    username: username,
    id: uid,
  }

  const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24,
  })
  return token
}

const renderPage =
  (req, res) =>
  (successMessage, errorMessage, url, otherFields = {}) => {
    req.flash('successMessage', successMessage || '')
    req.flash('errorMessage', errorMessage || '')
    for (const key in otherFields) {
      req.flash(key, otherFields[key])
    }
    return res.redirect(url)
  }

const renderViewPage =
  (req, res) =>
  (successMessage, errorMessage, url, otherFields = {}) => {
    req.flash('successMessage', successMessage || '')
    req.flash('errorMessage', errorMessage || '')
    for (const key in otherFields) {
      req.flash(key, otherFields[key])
    }
    return res.redirect(url)
  }

const initDb = async () => {
  const password = await generatePassword('123')
  const user = new User({
    username: 'nguyenvantuan',
    password,
  })

  user.save()
}

const obj = {
  generatePassword,
  generateToken,
  renderPage,
  initDb,
  renderViewPage,
}

module.exports = obj
