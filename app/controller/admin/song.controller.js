const express = require('express')
const { isEmpty, cloneDeep } = require('lodash')
const moment = require('moment')
const router = express.Router()
const { renderPage } = require('../../config')
const Song = require('../../models/song.model')
const Album = require('../../models/album.model')
const Playlist = require('../../models/playlist.model')
const Category = require('../../models/category.model')
const mongoose = require('mongoose')

// Cài đặt giao diện trang chủ
router.get('/', async (req, res) => {
  const songs = await Song.find()
  let payload = (req.flash('payload') && req.flash('payload')[0]) || {}
  if (!Object.keys(payload).length && !isEmpty(songs)) {
    payload = songs
    payload = payload.map((each) => {
      const { _id, thumbnail, title, artists, updatedAt } = each
      return {
        thumbnail,
        title,
        artists,
        id: _id.valueOf(),
        updatedAt: moment(updatedAt).format('DD-MM-YYYY'),
      }
    })
  }
  return res.render('Song', {
    errorMessage: req.flash('errorMessage'),
    successMessage: req.flash('successMessage'),
    payload,
  })
})

router.get('/tao-moi', async (req, res) => {
  let payload
  const { id } = req.query
  if (id) {
    const song = await Song.findById({ _id: id })
    if (song) {
      payload = {
        ...song.toJSON(),
        album_id: song?.album_id.valueOf(),
        playlist_id: song?.playlist_id.valueOf(),
        category_id: song?.category_id.valueOf(),
        id,
      }
    }
  } else {
    payload = req.flash('payload')?.[0] || {}
  }

  let albums = await Album.find()
  let categories = await Category.find()
  let playlists = await Playlist.find()

  albums = albums.map((e) => ({ ...e.toJSON(), id: e._id.valueOf() }))
  categories = categories.map((e) => ({ ...e.toJSON(), id: e._id.valueOf() }))
  playlists = playlists.map((e) => ({ ...e.toJSON(), id: e._id.valueOf() }))

  return res.render('Song/Create', {
    errorMessage: req.flash('errorMessage'),
    successMessage: req.flash('successMessage'),
    payload,
    albums,
    categories,
    playlists,
  })
})

router.post('/tao-moi', async (req, res) => {
  const {
    title,
    album_id,
    playlist_id,
    artists,
    thumbnail,
    category_id,
    link,
    id,
  } = req.body

  if (!id) {
    const items = new Song({
      name_song: title,
      title,
      artists,
      thumbnail,
      link,
      album_id,
      playlist_id,
      category_id,
      like: 0,
    })
    await items.save()
  } else {
    const song = await Song.findById({ _id: id })
    song.name_song = title
    song.title = title
    song.artists = artists
    song.thumbnail = thumbnail
    song.link = link
    song.album_id = album_id
    song.playlist_id = playlist_id
    song.category_id = category_id
    await song.save()
  }

  const url = `/auth/bai-hat/tao-moi?id=${id}`
  return renderPage(req, res)(
    id ? 'Cập nhật thành công' : 'Tạo mới thành công',
    '',
    url
  )
})

router.post('/xoa', async (req, res) => {
  const { id } = req.query
  const song = await Song.findById({ _id: id })
  await song.delete()
  const link = `/auth/bai-hat`
  return renderPage(req, res)('Xóa bài hát thành công', '', link)
})

module.exports = router
