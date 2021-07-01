"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next_1.default({ dev });
const handle = app.getRequestHandler();
const apiPaths = {
    '/api': {
        target: 'https://systempcs.herokuapp.com',
        pathRewrite: {
            '^/api': '/api'
        },
        changeOrigin: true
    }
};
const isDevelopment = process.env.NODE_ENV !== 'production';
app.prepare().then(() => {
    const server = express_1.default();
    if (isDevelopment) {
        server.use('/api', http_proxy_middleware_1.createProxyMiddleware(apiPaths['/api']));
    }
    server.all('*', (req, res) => {
        return handle(req, res);
    });
    server.listen(port, () => {
        console.info(`Ready on port ${port}`);
    });
}).catch((err) => {
    console.log('Error:::::', err);
});
exports.default = {};
