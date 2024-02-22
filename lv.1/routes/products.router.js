import express from 'express';
import item from '../schemas/products.schema.js'

const router = express.Router();

// 상품작성 API
router.post('/products', async (req, res) => {
    const { title, content, author, password, status } = req.body;

    if (!title || !content || !author || !password) {  // 데이터가 올바르게 입력 되지 않을 경우
        return res.status(400).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
    }


    const newitem = new item({ // 새 상품 등록
        title,
        content,
        author,
        password,
        status
    });

    const savedIetm = await newitem.save(); // 새상품을 데이터 베이스의 저장

    res.status(201).json({ message: "판매 상품을 등록하였습니다." }); // 성공적으로 저장하면 리턴

});



export default router;