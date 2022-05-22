const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max:50,
        },
        title:{
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
        }
    }, { timestamps: true },
);

module.exports = mongoose.model("Topic", topicSchema);