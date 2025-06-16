// controllers/userController.js

require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * POST /api/user
 * 注册或登录用户（根据 openid 查找，若不存在则创建）
 * 请求体示例：
 * {
 *   "openid": "wx1234567890",
 *   "nickname": "张三",
 *   "avatar": "https://…/avatar.jpg"
 * }
 */
exports.createUser = async (req, res, next) => {
  try {
    const { openid, nickname, avatar } = req.body;
    if (!openid) {
      const err = new Error('缺少 openid');
      err.statusCode = 400;
      throw err;
    }

    // 查找是否已有该 openid 的用户
    let user = await User.findOne({ openid });
    if (!user) {
      // 不存在则新建
      user = new User({ openid, nickname, avatar });
      await user.save();
    } else {
      // 已存在则更新昵称、头像和最后登录时间
      user.nickname = nickname || user.nickname;
      user.avatar = avatar || user.avatar;
      user.lastLoginTime = Date.now();
      await user.save();
    }

    // 生成 JWT，payload 中只包含用户 id
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      code: 201,
      msg: '注册/登录成功',
      data: {
        user,
        token
      }
    });

  } catch (err) {
    next(err);
  }
};


/**
 * GET /api/user
 * 获取当前用户信息（需在路由中加鉴权 middlewares/auth）
 * 鉴权成功后，req.user 中会有 User 实例
 */
exports.getUser = (req, res, next) => {
  try {
    // 由 auth.middleware 验证并挂载
    const user = req.user;
    res.status(200).json({
      code: 200,
      msg: '获取用户信息成功',
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// 获取历史消费记录
exports.getHistoryConsumption = async (req, res, next) => {
  try {
    const user = req.user;
    const historyConsumption = await HistoryConsumption.find({ user: user.id });
    res.status(200).json({
      code: 200,
      msg: '获取历史消费记录成功',
      data: historyConsumption
    });
  } catch (err) {
    next(err);
  }
};