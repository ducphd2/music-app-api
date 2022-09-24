const middleware = require('../config/middleware')

const adminRouters = {
  song: {
    prefix: '/auth/bai-hat',
    route: require('../controller/admin/song.controller'),
  },
  category: {
    prefix: '/auth/the-loai',
    route: require('../controller/admin/category.controller'),
  },
  album: {
    prefix: '/auth/album',
    route: require('../controller/admin/album.controller'),
  },
  playlist: {
    prefix: '/auth/playlist',
    route: require('../controller/admin/playlist.controller'),
  },
  topic: {
    prefix: '/auth/topic',
    route: require('../controller/admin/topic.controller'),
  },
}

const clientRouters = {
  login: {
    prefix: '/dang-nhap',
    route: require('../controller/admin/user.controller'),
  },
}

const generateRouters = (app) => {
  // Admin Routers
  Object.keys(adminRouters).forEach((key) => {
    const router = adminRouters[key]
    app.use(router.prefix, middleware.userExtractor, router.route)
  })

  // Client Routers
  Object.keys(clientRouters).forEach((key) => {
    const router = clientRouters[key]
    app.use(router.prefix, router.route)
  })
}

module.exports = generateRouters
