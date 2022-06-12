const userService = require("../services/user.service");

// TODO: api user and auth

module.exports = {
  createUser: async function (req, res) {
    try {
      const data = await userService.createUser(req.body);
      res.status(201).json({ status: 201, message: "success", data });
    } catch (error) {
      res.status(400).json(error);
    }
  },

  login: async function (req, res) {
    try {
      const data = await userService.login(req.body);
      res.status(201).json({ status: 200, message: "success", data });
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
