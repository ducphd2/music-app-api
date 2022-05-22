const { json } = require('express/lib/response');
const PlayList = require('../models/playlist.model');
const Song = require('../models/song.model');
// TODO: create a play list music

module.exports = {
    createPlayList: async (req, res) => {
        
        // get attribute of  play list
        const { name ,image , thumbnail} = req.body;
        try {
            const playlist = new PlayList({
                name,
                image,
                thumbnail
            })

            // save album in database
            playlist.save();
            return res.status(201).json({ PlayList: playlist, message: "Create new playlist successfully" });
        } catch (err) {
            res.status(500).json(err);
        }
    },
      // get all info of the play list
      getAllPlayList: async (req, res) => {
        try {
            let playlists = await PlayList.find();
            res.status(200).json(playlists);
        } catch (error) {
            res.status(500).json(err);
        }
    },
    // get all info of the play list
    getSongPlayList: async (req, res) => {
                try {   
                    let playlists = await PlayList.aggregate([
                        { $lookup: {
                            from: 'songs',
                            localField: '_id',
                            foreignField: 'playlist_id',
                            as: 'songs'
                        }},
                   ]);
                    res.status(200).json(playlists);
                } catch (error) {
                    res.status(500).json(error);
                }
            },
    // get one info of the play list
      getOne: async (req, res) => {
        try {
            let album = await PlayList.findById(req.params.id);
            res.status(200).json(album);
        } catch (err) {
            res.status(500).json(err);
            console.log(error);
        }
    },
      //   update one
      updateOne: async (req, res) => {
        try {
            await PlayList.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).json("Play list updated successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //  delete one
    deleteOne: async (req, res) => {
        try {
            let playList = await PlayList.findById(req.params.id);
            await playList.delete();
            res.status(200).json("Play list deleted successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },

}
