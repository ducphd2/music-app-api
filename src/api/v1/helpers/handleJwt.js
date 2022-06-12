const jwt = require("jsonwebtoken");
require("dotenv").config();
/**
 * Pass the user's object to create a JWT
 * @param {*} user
 */
const signAccessToken = async (user) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.fullName,
    };
    const JWT_SECRET = process.env.JWT_SECRET;
    const option = {
      expiresIn: "2h", // 10s 30m
    };
    jwt.sign(payload, JWT_SECRET, option, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

/**
 * Pass the token to verify the sign
 * @param {*} tokenJWT
 * @returns
 */
const verifyToken = async (tokenJWT) => {
  try {
    return jwt.verify(tokenJWT, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { signAccessToken, verifyToken };
