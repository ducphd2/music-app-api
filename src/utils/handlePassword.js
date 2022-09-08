const bcryptjs = require("bcryptjs");

/**
 * TODO: Encrypt password | Sync
 * @param {*} passwordPlain
 */
const encrypt = (passwordPlain) => {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(passwordPlain, salt);
};

/**
 * TODO: Check if the hash corresponds to the key | Sync
 * @param {*} passwordPlain
 * @param {*} hashPassword
 */
const compare = (passwordPlain, hashPassword) => {
  return bcryptjs.compareSync(passwordPlain, hashPassword);
};

module.exports = { encrypt, compare };
