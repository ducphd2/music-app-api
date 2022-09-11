import Topic from '@root/models/Topic'

export const create = async (createData) => Topic.create(createData)

export const getTopicById = async (id) => Topic.findById(id)

export const getTopicByFilter = async (filter) => Topic.findOne(filter)

export const getAllTopic = async () => Topic.find()

export const updateTopic = async (id, dataUpdate) => Topic.findByIdAndUpdate(id, dataUpdate, { new: true })

export const deleteTopic = async (id) => Topic.findByIdAndDelete(id)
