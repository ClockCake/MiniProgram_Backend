const express = require('express');
const router = express.Router();

// 品牌接口
router.get('/brand', (req, res, next) => {
    try {
      const brand = [
        {
          id: 1,
          name: 'Apple',
          image: `${req.protocol}://${req.get('host')}/static/images/apple.svg`
        },
        {
          id: 2,
          name: '华为',
          image: `${req.protocol}://${req.get('host')}/static/images/huawei.svg`
        },
        {
            id: 3,
            name: '三星',
            image: `${req.protocol}://${req.get('host')}/static/images/samsung.svg`
        },
        {
            id: 4,
            name: '小米',
            image: `${req.protocol}://${req.get('host')}/static/images/xiaomi.svg`
        },
        {
            id: 5,
            name: 'OPPO',
            image: `${req.protocol}://${req.get('host')}/static/images/oppo.svg`
        },
        {
            id: 6,
            name: 'VIVO',
            image: `${req.protocol}://${req.get('host')}/static/images/vivo.svg`
        },
        {
            id: 7,
            name: '一加',
            image: `${req.protocol}://${req.get('host')}/static/images/oneplus.svg`
        },
        {
            id: 8,
            name: '魅族',
            image: `${req.protocol}://${req.get('host')}/static/images/meizu.svg`
        },
        
        
      ];
  
      res.status(200).json({
        code: 200,
        data: brand,
        msg: '获取成功'
      });
    } catch (err) {
      next(err); // 把错误交给统一错误处理中间件
    }
  });

module.exports = router;