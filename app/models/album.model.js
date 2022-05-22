const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        artists_name: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true
        }
    },{ timestamps: true },
);

module.exports = mongoose.model("Album", albumSchema);