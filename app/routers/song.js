const express = require("express");
const router = express.Router();


const {createSong, getAllSong , getMostLikeSong, updateLikeForSong, searchByKeywords} = require("../controller/song.controller");

router.post("/createSong", createSong);
router.get("/getAllSong", getAllSong);
router.get("/getMostLikeSong",getMostLikeSong);
router.patch("/updateLikeForSong", updateLikeForSong);
router.post("/searchByKeywords", searchByKeywords);

module.exports = router;
