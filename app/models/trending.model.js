const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trendingSchema = new Schema(
    {
        song_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Song",
            require: true,
        },
        description:{
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        }
    }, { timestamps: true },
);

module.exports = mongoose.model("Trending", trendingSchema);