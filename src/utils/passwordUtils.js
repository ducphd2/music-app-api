import argon2 from 'argon2'

export const getHashedPassword = async (password) => argon2.hash(password)

export const verifyPassword = async (hashedPassword, password) => argon2.verify(hashedPassword, password)

