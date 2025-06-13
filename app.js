require('dotenv').config();      // 加载 .env 文件
const express = require('express');
const app = express();
const userRouter = require('./routes/user');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {  // 连接 MongoDB
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json()); // 解析 JSON 请求体

app.use('/api/user', userRouter); // 挂载用户路由

app.use(notFound);

app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});