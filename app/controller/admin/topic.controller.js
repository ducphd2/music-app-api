const express = require("express");
const { isEmpty } = require("lodash");
const moment = require("moment");
const router = express.Router();
const { renderPage } = require("../../config");
const Topic = require('../../models/topic.model');

router.get("/", async (req, res) => {
    const topics = await Topic.find();
    let payload = (req.flash("payload") && req.flash("payload")[0]) || {};
    if (!Object.keys(payload).length && !isEmpty(topics)) {
        payload = topics;
        payload = payload.map((each) => {
            const {
                _id, image, updatedAt, name,
            } = each;
            return {
                image, name,
                id: _id.valueOf(),
                updatedAt: moment(updatedAt).format('DD-MM-YYYY'),
            };
        });
    }
    return res.render("Topic", {
        errorMessage: req.flash("errorMessage"),
        successMessage: req.flash("successMessage"),
        payload,
    });
});

router.get('/tao-moi', async (req, res) => {
    let payload;
    const { id } = req.query;
    if (id) {
        const topic = await Topic.findById({_id: id});
        if (topic) {
            payload = {
                ...topic.toJSON(),
                id,
            }
        }

    } else {
        payload = req.flash('payload')?.[0] || {};
    }

    return res.render('Topic/Create', {
        errorMessage: req.flash("errorMessage"),
        successMessage: req.flash("successMessage"),
        payload,
    });
});

router.post('/tao-moi', async (req, res) => { 
    const {
        name,
        id,
        image,
    } = req.body;

    if (!id) {
        const items = new Topic({
            name,
            title: name,
            image,
        });
        await items.save();
    } else { 
        const topic = await Topic.findById({_id: id});
        topic.name = name;
        topic.title = name;
        topic.image = image;
        await topic.save();
    } 

    const url = `/auth/topic/tao-moi?id=${id}`;
    return renderPage(req, res)(id ? 'Cập nhật thành công' : 'Tạo mới thành công', '', url);
});

module.exports = router;