import Song from '@root/models/Song'

export const create = async (createData) => Song.create(createData)

export const getSongByFilter = async (filter) => Song.findOne(filter)

export const getAllSong = async () => Song.find()

export const deleteSong = async (id) => Song.findByIdAndDelete(id)
