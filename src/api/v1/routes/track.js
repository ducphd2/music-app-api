const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

const trackController = require("../controllers/track.controller");

router.use(checkAuth);

router.get("/:id", trackController.getTrackById);
router.get("/", trackController.getAllTrack);
router.get("/favoriteTracks", trackController.getFavoriteTracks);
router.post("/", trackController.createTrack);
router.patch("/updateLikeForTrack", trackController.updateLikeForTrack);
router.post("/searchByKeywords", trackController.searchByKeywords);

module.exports = router;
