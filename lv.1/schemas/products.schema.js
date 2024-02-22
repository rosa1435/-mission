import mongoose from 'mongoose';

const goodsSchema = new mongoose.Schema({
  title: { // 상품이름
    type: String,
    required: true, // required는 필수인지 아닌지입니다.
  },
  content: { // 상품 내용
    type: String,
    required: true
  },
  author: { // 판매자 이름
    type: String,
    required: true,
  },
  password: { // 비밀번호
    type: Number,
    required: true,
  },
  status: { //상품상태 
    type: String,
    enum: ['FOR_SALE', 'SOLD_OUT'],
    default:'FOR_SALE',
    },
    createdAt: { // 작성 날짜
      type: Date,
      default: Date.now // 문서가 생성될 때 현재 날짜와 시간으로 설정
    }
});


export default mongoose.model('node_lv1', goodsSchema); // 매니저님한테 물어보기