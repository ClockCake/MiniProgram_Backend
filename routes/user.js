const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

// 注册 / 登录
router.post('/', userController.createUser);

// 获取当前用户信息，前面加鉴权
router.get('/', auth, userController.getUser);

module.exports = router;