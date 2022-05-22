const Topic = require('../models/topic.model');
const Category = require('../models/category.model');
// TODO: add new a topic

module.exports = {
    createTopic: (req, res) => {
        try {
            // get request body
            const {name,title, image} = req.body;

             // create new topic
            const newTopic = new Topic({
                name,
                title,
                image,
            });

            // save topic
            newTopic.save();

            // check status and return new topic
            return res.status(201).json({ topic: newTopic, message: "Create new topic successfully" });
            
        } catch (error) {
            console.error(error);
        }

    },
    // get all info of the topic
    getAllTopic: async (req, res) => {
        try {
            let topics = await Topic.find().limit(4);
            res.status(200).json(topics);
        } catch (error) {
            res.status(500).json(err);
        }
    },
    // get one info of the topic
      getOne: async (req, res) => {
        try {
            let topic = await Topic.findById(req.params.id);
            res.status(200).json(topic);
        } catch (err) {
            res.status(500).json(err);
            console.log(error);
        }
    },
    getCategoryForTopic: async (req, res) => {
        try {   
            let topics = await Topic.aggregate([
                { $lookup: {
                    from: 'categories',
                    localField: '_id',
                    foreignField: 'topic_id',
                    as: 'categories'
                }},
           ]);
            res.status(200).json(topics);
        } catch (error) {
            res.status(500).json(error);
        }
    },

      //   update one
      updateOne: async (req, res) => {
        try {
            await Topic.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).json("Topic updated successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //  delete one
    deleteOne: async (req, res) => {
        try {
            let topic = await Topic.findById(req.params.id);
            await topic.delete();
            res.status(200).json("Topic deleted successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },
}