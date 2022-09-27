const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 3000
const JWT_SECRET = process.env.JWT_SECRET

module.exports = { HOST, PORT, JWT_SECRET }
