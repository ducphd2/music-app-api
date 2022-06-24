const express = require("express");
const { isEmpty } = require("lodash");
const moment = require("moment");
const router = express.Router();
const { renderPage } = require("../../config");
const Playlist = require('../../models/playlist.model');

router.get("/", async (req, res) => {
    const playlists = await Playlist.find();
    let payload = (req.flash("payload") && req.flash("payload")[0]) || {};
    if (!Object.keys(payload).length && !isEmpty(playlists)) {
        payload = playlists;
        payload = payload.map((each) => {
            const {
                _id, thumbnail, updatedAt, name,
            } = each;
            return {
                thumbnail, name,
                id: _id.valueOf(),
                updatedAt: moment(updatedAt).format('DD-MM-YYYY'),
            };
        });
    }
    return res.render("Playlist", {
        errorMessage: req.flash("errorMessage"),
        successMessage: req.flash("successMessage"),
        payload,
    });
});

router.get('/tao-moi', async (req, res) => {
    let payload;
    const { id } = req.query;
    if (id) {
        const playlist = await Playlist.findById({_id: id});
        if (playlist) {
            payload = {
                ...playlist.toJSON(),
                id,
            }
        }

    } else {
        payload = req.flash('payload')?.[0] || {};
    }

    return res.render('Playlist/Create', {
        errorMessage: req.flash("errorMessage"),
        successMessage: req.flash("successMessage"),
        payload,
    });
});

router.post('/tao-moi', async (req, res) => { 
    const {
        name,
        id,
        thumbnail,
    } = req.body;

    if (!id) {
        const items = new Playlist({
            name,
            thumbnail,
            image: thumbnail,
        });
        await items.save();
    } else { 
        const playlist = await Playlist.findById({_id: id});
        playlist.name = name;
        playlist.image = thumbnail;
        playlist.thumbnail = thumbnail;
        await playlist.save();
    } 

    const url = `/auth/playlist/tao-moi?id=${id}`;
    return renderPage(req, res)(id ? 'Cập nhật thành công' : 'Tạo mới thành công', '', url);
});

module.exports = router;
