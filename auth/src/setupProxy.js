const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    console.log("Proxying request...")
    app.use('/managers', createProxyMiddleware({
        target: 'http://localhost:5050',
        changeOrigin: true
    }));

    app.use('/matches', createProxyMiddleware({
        target: 'http://localhost:5050',
        changeOrigin: true
    }));

    app.use('/users', createProxyMiddleware({
        target: 'http://localhost:5050',
        changeOrigin: true
    }));
};