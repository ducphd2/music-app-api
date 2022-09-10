import User from '@root/models/User'

export const create = async (createData) => User.create(createData)

export const getUserByFilter = async (filter) => User.findOne(filter)
