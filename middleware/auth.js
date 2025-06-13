// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;

  if (!token) {
    const err = new Error('未提供 Token');
    err.statusCode = 401;
    return next(err);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      const err = new Error('用户不存在');
      err.statusCode = 401;
      return next(err);
    }
    req.user = user; // 后续可以通过 req.user 访问当前用户
    next();
  } catch (e) {
    const err = new Error('Token 无效或已过期');
    err.statusCode = 401;
    next(err);
  }
};