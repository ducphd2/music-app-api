const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        topic_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic",
            require: true,
        }
        , 
        name: {
            type: String,
            required: true,
            trim: true
        },
        title: {
            type: String,
            require: true,
            trim: true
        },
        thumbnail: {
            type: String,
            required: true
        }
    },{ timestamps: true },
);

module.exports = mongoose.model("Category", categorySchema);