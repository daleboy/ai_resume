const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // CORS middleware for handling preflight requests
    server.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*'); // Allow all origins for testing
        res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-DashScope-SSE');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200); // Handle preflight requests
        }
        next();
    });

    // Proxy setup
    server.use('/api/proxy', createProxyMiddleware({
        target: 'https://dashscope.aliyuncs.com',
        changeOrigin: true,
        pathRewrite: {
            '^/api/proxy': '',
        },
        onProxyRes: (proxyRes) => {
            // It's important to set CORS headers on the response
            proxyRes.headers['Access-Control-Allow-Origin'] = '*'; // Allow all origins
            proxyRes.headers['Access-Control-Allow-Headers'] = 'Authorization, Content-Type, X-DashScope-SSE';
        },
    }));

    // Handle all other requests
    server.all('*', (req, res) => handle(req, res));

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
    });
});