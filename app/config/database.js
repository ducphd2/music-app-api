require("dotenv").config();
const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://tuanma:tuanma123@cluster0.lg0lb.mongodb.net/MusicApp?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("MongoDB connecting .......");

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;