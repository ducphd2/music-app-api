const User = require("../models/user.model");
const createError = require("http-errors");
const { encrypt, compare } = require("../helpers/handlePassword");
const { signAccessToken } = require("../helpers/handleJwt");

// TODO: api user and auth

module.exports = {
  createUser: async (data) => {
    const email = data.email;
    const fullName = data.fullName;
    const isExist = await User.findOne({ email });

    if (isExist) {
      throw createError.Conflict(`${email} is already exist.`);
    }

    const password = encrypt(data.password);
    const dataUser = await User.create({ fullName, email, password });

    // TODO: Hide password when return dataUser
    dataUser.set("password", undefined, { strict: false });
    return dataUser;
  },

  login: async (data) => {
    const email = data.email;
    const password = data.password;
    const user = await User.findOne({ email });

    if (!user) {
      throw createError.NotFound(`User is not registered`);
    }

    const hashedPassword = user.password;
    const isValid = compare(password, hashedPassword);

    if (!isValid) {
      throw createError.Unauthorized(`Password is not correct!`);
    }

    // TODO: Hide password when return dataUser
    user.set("password", undefined, { strict: false });
    const signedToken = await signAccessToken(user);

    const dataUser = {
      accessToken: "Bearer " + signedToken,
      user,
    };

    return dataUser;
  },

  getUserById: async (id) => {
    return await User.findById(id);
  },

  getAllUser: async () => {
    return await User.find();
  },
};
