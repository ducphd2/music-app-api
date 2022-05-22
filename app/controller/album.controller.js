const Album = require('../models/album.model');


// TODO: create a album music

module.exports = {
    createAlbum: async (req, res) => {
        
        // get attribute of album
        const { name ,artists_name , thumbnail} = req.body;
        try {
            const album = new Album({
                name,
                artists_name,
                thumbnail
            })

            // save album in database
            album.save();
            return res.status(201).json({ album: album, message: "Create new album successfully" });
        } catch (err) {
            res.status(500).json(err);
        }
    },
      // get all info of the album
      getAllAlbum: async (req, res) => {
        try {
            let albums = await Album.find();
            res.status(200).json(albums);
        } catch (error) {
            res.status(500).json(err);
        }
    },
    // get one info of the album
      getOne: async (req, res) => {
        try {
            let album = await Album.findById(req.params.id);
            res.status(200).json(album);
        } catch (err) {
            res.status(500).json(err);
            console.log(error);
        }
    },
      //   update one
      updateOne: async (req, res) => {
        try {
            await Album.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).json("Album updated successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //  delete one
    deleteOne: async (req, res) => {
        try {
            let album = await Album.findById(req.params.id);
            await album.delete();
            res.status(200).json("Album deleted successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllSongInAlbum: async(req, res) => {
        try {
            let albums = await Album.aggregate([
                { $lookup: {
                    from: 'songs',
                    localField: '_id',
                    foreignField: 'album_id',
                    as: 'songs'
                }},
           ]);
            res.status(200).json(albums);
        } catch (err) {
            res.status(500).json(err);
        }
    }

}
