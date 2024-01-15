// routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/user'); // User modelini import ettiğinize emin olun

// Tüm kullanıcıları getir
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('firstName lastName email phoneNumber companyName companyAddress companyWebsite');
        console.log(users);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Belirli bir kullanıcıyı getir
router.get('/users/:id', getUser, (req, res) => {
    res.json(req.user);
});

// Yeni bir kullanıcı ekle
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        console.log('Eklenen kullanıcı:', user);

        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Middleware: Belirli bir kullanıcıyı getir
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    req.user = user;
    next();
}

module.exports = router;
