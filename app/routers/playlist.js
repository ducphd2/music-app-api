const express = require("express");
const router = express.Router();


const {createPlayList, getAllPlayList, getOne, updateOne, deleteOne, getSongPlayList } = require("../controller/playlist.controller");

router.post("/createPlayList", createPlayList);
router.get("/getAllPlayList", getAllPlayList);
router.get("/getOnePlayList/:id",getOne);
router.patch("/updateOnePlayList/:id",updateOne);
router.delete("/deletePlayList/:id",deleteOne);
router.get("/getSongPlayList", getSongPlayList);


module.exports = router;