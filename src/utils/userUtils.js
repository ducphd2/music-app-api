import argon2 from 'argon2'

export const getHashedPassword = async (password) => argon2.hash(password)

export const verifyPassword = async (hashedPassword, password) => argon2.verify(hashedPassword, password)

// export const changePassword = async (hashedPassword, email) => {
//   await Authen.updateOne({ email }, { password: hashedPassword })
// }

// export const verifyPassword = async (password, email) => {
//   const user = await Authen.findOne({ email })
//   const userPassword = user.password
//   const isSamePassword = await argon2.verify(userPassword, password)
//   return isSamePassword
// }

// export const isPasswordSet = async (email) => {
//   const user = await Authen.findOne({ email })
//   return !!(user && user.password)
// }
