// routes/products.js

const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Tüm ürünleri getir
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find().select('title content price category');
        console.log(products)
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Belirli bir ürünü getir
router.get('/products/:id', getProduct, (req, res) => {
    req.body
});

// Yeni bir ürün ekle
router.post('/products', async (req, res) => {
    const product = new Product(req.body);
    try {
        // Eklediğiniz verinin console çıktısını kontrol etmek için
        console.log('Eklenen ürün:', product);

        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Middleware: Belirli bir ürünü getir
async function getProduct(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Ürün bulunamadı' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.product = product;
    next();
}

router.delete('/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Ürün bulunamadı' });
        }

        console.log('Silinen ürün:', deletedProduct);
        res.status(200).json({ message: 'Ürün başarıyla silindi' });
    } catch (error) {
        console.error('Ürün silinirken hata oluştu:', error);
        res.status(500).json({ message: error.message });
    }
});

router.patch('/products/:id', getProduct, async (req, res) => {
    if (req.body.title != null) {
        res.product.title = req.body.title;
    }
    if (req.body.content != null) {
        res.product.content = req.body.content;
    }
    if (req.body.price != null) {
        res.product.price = req.body.price;
    }
    if (req.body.category != null) {
        res.product.category = req.body.category;
    }

    try {
        const updatedProduct = await res.product.save();
        console.log('Güncellenen ürün:', updatedProduct);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Ürün güncellenirken hata oluştu:', error);
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;