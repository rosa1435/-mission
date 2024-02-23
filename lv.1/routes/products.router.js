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



// 상품 목록 조회 API

router.get('/products', async (req, res) => {
    const items = await item.find({}, '-password').sort({ createdAt: -1 }).exec();
    return res.status(200).json({ items });
});

// 상품 상세조회 API
router.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;


    if (!/^[0-9a-fA-F]{24}$/.test(productId)) {  // 데이터가 올바르게 입력 되지 않을 경우
        return res.status(400).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
    }


    const oneitem = await item.findById(productId).select('-password').exec();

    if (!oneitem) { //상품이 존재하지 않을경우
        return res.status(404).json({ message: "상품 조회에 실패하였습니다." })
    }
    return res.status(200).json(oneitem);
});



// 상품정보 수정 API
router.patch('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { title, content, password, status } = req.body;

    // 데이터 형식 검증
    if (!productId || !title || !content || !password || !status) {
        return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }

    const product = await item.findById(productId).exec();

    // 상품이 존재하지 않을 경우
    if (!product) {
        return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
    }

    // 상품의 비밀번호가 일치하지 않을 경우
    if (product.password !== password) {
        return res.status(401).json({ message: "상품을 수정할 권한이 존재하지 않습니다." });
    }

    // 상품 정보 수정
    product.title = title;
    product.content = content;
    product.status = status;

    await product.save(); // 수정된 정보 저장

    return res.status(200).json({ message: "상품 정보를 수정하였습니다." });

});


// 상품삭제 API
router.delete('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { password } = req.body; // 클라이언트로부터 삭제 요청 시 비밀번호 받기

    if (!productId || !password) {
        return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }

    const product = await item.findById(productId).exec();

    // 상품이 존재하지 않을 경우
    if (!product) {
        return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
    }

    // 상품의 비밀번호가 일치하지 않을 경우
    if (product.password !== password) {
        return res.status(401).json({ message: "상품을 삭제할 권한이 존재하지 않습니다." });
    }

    // 상품 정보 삭제
    await item.deleteOne({ _id: productId });

    return res.status(200).json({ message: "상품이 성공적으로 삭제되었습니다." });
});

export default router;