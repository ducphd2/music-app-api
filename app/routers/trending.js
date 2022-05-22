const express = require("express");
const router = express.Router();


const {createTrending, getAllTrending, getOne, updateOne, deleteOne,getSongInTrending  } = require("../controller/trending.controller");

router.post("/createTrending", createTrending);
router.get("/getAllTrending", getAllTrending);
router.get("/getOneTrending/:id",getOne);
router.patch("/updateOneTrending/:id",updateOne);
router.delete("/deleteOneTrending/:id",deleteOne);
router.get("/getSongInTrending",getSongInTrending);


module.exports = router;