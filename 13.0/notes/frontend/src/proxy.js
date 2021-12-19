//$ npm install http-proxy-middleware

const { createProxyMiddleware } = require("http-proxy-middleware")

const PORT = process.env.PORT || 3001

const URL = "http://localhost:" + PORT

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: BACKEND_URL,
      changeOrigin: true,
    })
  )
}