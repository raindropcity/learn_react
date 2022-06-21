const { createProxyMiddleware } = require('http-proxy-middleware')

const proxy = {
  target: 'http://localhost:3001',
  ws: true,
  onProxyReqWs: (proxyReq, req, socket) => {
    socket.on('error', function (error) {
      console.warn('Websockets error.', error)
    })
  }
}

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/bistro/recommend', proxy)
  )
}