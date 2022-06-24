const express = require("express");
const { isEmpty, cloneDeep } = require("lodash");
const moment = require("moment");
const router = express.Router();
const { renderPage } = require("../../config");
const Category = require('../../models/category.model');
const Topic = require('../../models/topic.model');
const mongoose = require('mongoose');

// Cài đặt giao diện trang chủ
router.get("/", async (req, res) => {
    const categories = await Category.find();
    let payload = (req.flash("payload") && req.flash("payload")[0]) || {};
    if (!Object.keys(payload).length && !isEmpty(categories)) {
        payload = categories;
        payload = payload.map((each) => {
            const {
                _id, thumbnail, updatedAt, name,
            } = each;
            return {
                thumbnail, title: name,
                id: _id.valueOf(),
                updatedAt: moment(updatedAt).format('DD-MM-YYYY'),
            };
        });
    }
    return res.render("Category", {
        errorMessage: req.flash("errorMessage"),
        successMessage: req.flash("successMessage"),
        payload,
    });
});

router.get('/tao-moi', async (req, res) => {
    let payload;
    const { id } = req.query;
    if (id) {
        const category = await Category.findById({_id: id});
        if (category) {
            payload = {
                ...category.toJSON(),
                title: category.name,
                topic_id: category?.topic_id?.valueOf(),
                id,
            }
        }

    } else {
        payload = req.flash('payload')?.[0] || {};
    }

    let topics = await Topic.find();

    topics = topics.map((e) => ({ ...e.toJSON(), id: e._id.valueOf() }));

    return res.render('Category/Create', {
        errorMessage: req.flash("errorMessage"),
        successMessage: req.flash("successMessage"),
        payload,
        topics,
    });
});

router.post('/tao-moi', async (req, res) => { 
    const {
        title,
        topic_id,
        id,
        thumbnail,
    } = req.body;

    if (!id) {
        const items = new Category({
            name: title,
            title,
            topic_id,
            thumbnail,
        });
        await items.save();
    } else { 
        const payload = cloneDeep(req.body);
        delete payload.id;
        payload.name = title;
        const category = await Category.findById({_id: id});
        category.title = title;
        category.name = title;
        category.topic_id = topic_id;
        category.thumbnail = thumbnail;
        await category.save();
    } 

    const url = `/auth/the-loai/tao-moi?id=${id}`;
    return renderPage(req, res)(id ? 'Cập nhật thành công' : 'Tạo mới thành công', '', url);
});

module.exports = router;
