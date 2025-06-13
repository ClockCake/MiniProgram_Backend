// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
    // 如果路由未命中传过来的 err.statusCode 是 404，其它默认 500
    const statusCode = err.statusCode || 500;
  
    // 如果已经发过头，就直接交给 express 默认处理
    if (res.headersSent) {
      return next(err);
    }
  
    res
      .status(statusCode)
      .json({
        code: statusCode,              // 与 HTTP 状态码一致
        msg: err.message || 'Error',   // 错误信息
        data: null                     // 统一 data 字段，错误时为 null
      });
};