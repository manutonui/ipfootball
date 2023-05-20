const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    console.log("Proxying request...")
    app.use('/managers', createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true
    }));

    app.use('/matches', createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true
    }));
};