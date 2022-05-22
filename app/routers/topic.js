const express = require("express");
const router = express.Router();


const {createTopic, getAllTopic, getOne, updateOne, deleteOne,getCategoryForTopic} = require("../controller/topic.controller");

router.post("/createTopic", createTopic);
router.get("/getAllTopic", getAllTopic);
router.get("/getOneTopic/:id",getOne);
router.patch("/updateOneTopic/:id",updateOne);
router.delete("/deleteOneTopic/:id",deleteOne);
router.get("/getCategoryForTopic", getCategoryForTopic);

module.exports = router;
