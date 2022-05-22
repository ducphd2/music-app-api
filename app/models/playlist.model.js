const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playListSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max:50,
        },
        image:{
            type: String,
            required: true,
        },
        thumbnail: {
            type: String
        }
    }, { timestamps: true },
);

module.exports = mongoose.model("PlayList", playListSchema);