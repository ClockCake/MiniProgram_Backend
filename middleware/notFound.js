// middleware/notFound.js
module.exports = (req, res, next) => {
    // 构造一个 404 错误并交给后续的错误处理中间件
    const err = new Error(`Not Found - ${req.originalUrl}`);
    err.statusCode = 404;
    next(err);
};