// /schemas/index.js

import mongoose from 'mongoose';

const connect = () => {
  mongoose
    .connect(
      'mongodb+srv://sparta-user:aaaa4321@express-mongo.nt00bvp.mongodb.net/?retryWrites=true&w=majority&appName=express-mongo',
      {
        dbName: 'spa_mall', // spa_mall 데이터베이스명을 사용합니다.
      }
    )
    .catch((err) => console.log(err))
    .then(() => console.log('몽고디비 연결 성공'));
};

mongoose.connection.on('error', (err) => {
  console.error('몽고디비 연결 에러', err);
});

mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect();
});

export default connect;
