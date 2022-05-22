const Trending = require('../models/trending.model');

// TODO: add new a topic

module.exports = {
    createTrending: (req, res) => {
        try {
            // get request body
            const {song_id,description, image} = req.body;

             // create new trending
            const trending = new Trending({
                song_id,
                description,
                image
            });

            // save trending
            trending.save();

            // check status and return new trending
            return res.status(201).json({ Trending: trending, message: "Create new trending successfully" });
            
        } catch (error) {
            console.error(error);
        }

    },
    // get all info of the trending
    getAllTrending: async (req, res) => {
        try {
            let trending = await Trending.find();
            res.status(200).json(trending);
        } catch (error) {
            res.status(500).json(err);
        }
    },
    // get one info of the trending
      getOne: async (req, res) => {
        try {
            let trending = await Trending.findById(req.params.id);
            res.status(200).json(trending);
        } catch (err) {
            res.status(500).json(err);
            console.log(error);
        }
    },
      //   update one
      updateOne: async (req, res) => {
        try {
            await Trending.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).json("Trending updated successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //  delete one
    deleteOne: async (req, res) => {
        try {
            let topic = await Trending.findById(req.params.id);
            await topic.delete();
            res.status(200).json("Trending deleted successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },

     //  get one
     getSongInTrending: async (req, res) => {
        try {
            let trending = await Trending.find().populate("song_id");
            res.status(200).json(trending);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}