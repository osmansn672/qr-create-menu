const express = require('express');
const mongoose = require('mongoose');
const productRouter = require('./routes/products');
const cors = require('cors');
const app = express();
const port = 3001;

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/siriusJewerly', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', productRouter);
app.options('*', cors());
// Node.js örneği
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // İzin verilen origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // İzin verilen HTTP metotları
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // İzin verilen başlıklar
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});