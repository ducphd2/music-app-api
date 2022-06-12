const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
      trim: true,
    },
    bio: {
      type: String,
      default: "",
      trim: true,
      maxLength: 250,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxLength: 40,
      unique: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "person.png",
    },
    activityStatus: {
      type: String,
      default: "offline",
    },
    activated: {
      type: Boolean,
      default: process.env.ENABLE_SEND_EMAIL === "true" ? false : true,
    },
    role: { type: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
