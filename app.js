require('dotenv').config();      // 加载 .env 文件
const express = require('express');
const app = express();
const userRouter = require('./routes/user');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const homeRouter = require('./routes/home');
const path = require('path');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

  // 设置静态资源路径，访问 public 下的文件
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(express.json()); // 解析 JSON 请求体

app.use('/api/user', userRouter); // 挂载用户路由
app.use('/api/home', homeRouter); // 挂载首页路由

app.use(notFound);

app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});