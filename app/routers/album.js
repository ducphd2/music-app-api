const express = require("express");
const router = express.Router();


const {createAlbum, getAllAlbum, getOne, updateOne, deleteOne, getAllSongInAlbum} = require("../controller/album.controller");

router.post("/createAlbum", createAlbum);
router.get("/getAllAlbum", getAllAlbum);
router.get("/getOneAlbum/:id",getOne);
router.patch("/updateAlbum/:id",updateOne);
router.delete("/deleteOneAlbum/:id",deleteOne);
router.get("/getAllSongInAlbum", getAllSongInAlbum);

module.exports = router;