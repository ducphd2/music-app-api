const express = require("express");
const { isEmpty, cloneDeep } = require("lodash");
const moment = require("moment");
const router = express.Router();
const { renderPage } = require("../../config");
const Album = require('../../models/album.model');

router.get("/", async (req, res) => {
    const albums = await Album.find();
    let payload = (req.flash("payload") && req.flash("payload")[0]) || {};
    if (!Object.keys(payload).length && !isEmpty(albums)) {
        payload = albums;
        payload = payload.map((each) => {
            const {
                _id, thumbnail, updatedAt, name, artists_name,
            } = each;
            return {
                thumbnail, name,
                artists_name,
                id: _id.valueOf(),
                updatedAt: moment(updatedAt).format('DD-MM-YYYY'),
            };
        });
    }
    return res.render("Album", {
        errorMessage: req.flash("errorMessage"),
        successMessage: req.flash("successMessage"),
        payload,
    });
});

router.get('/tao-moi', async (req, res) => {
    let payload;
    const { id } = req.query;
    if (id) {
        const album = await Album.findById({_id: id});
        if (album) {
            payload = {
                ...album.toJSON(),
                id,
            }
        }

    } else {
        payload = req.flash('payload')?.[0] || {};
    }

    return res.render('Album/Create', {
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
        artists_name,
    } = req.body;

    if (!id) {
        const items = new Album({
            name,
            artists_name,
            thumbnail,
        });
        await items.save();
    } else { 
        const payload = cloneDeep(req.body);
        delete payload.id;
        payload.name = name;
        const album = await Album.findById({_id: id});
        album.name = name;
        album.artists_name = artists_name;
        album.thumbnail = thumbnail;
        await album.save();
    } 

    const url = `/auth/album/tao-moi?id=${id}`;
    return renderPage(req, res)(id ? 'Cập nhật thành công' : 'Tạo mới thành công', '', url);
});

module.exports = router;
