// telepített csomagok importálása
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
//const {FRONTED}=require('./config/dotenvConfig').config;

const limiter = require('./middleware/limiter');
const authenticateToken = require('./middleware/jwtAuth');
//const adminMiddleware=require('./middleware/admin');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const cartRoutes=require('./routes/cartRoutes');
const uploadsRoutes=require('./routes/uploadsRoutes');
const productRoutes=require('./routes/productsRoutes');
const deleteRoutes=require('./routes/deleteRoutes');
const editRoutes=require('./routes/editRoutes');
const oderRoutes=require('./routes/orderRoutes');
const buildRoutes=require('./routes/buildRoutes');

// Képzeld el, hogy van egy felhasználókat kezelő route


const app = express();

app.set('trust proxy',true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(cookieParser());
app.use(cors({
    origin: 'https://techbay2.netlify.app',
    credentials: true,
}));

app.use('/api/uploads', authenticateToken, express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/cart',cartRoutes );
app.use('/api/add',uploadsRoutes);
app.use('/api/getProducts',productRoutes);
app.use('/api/delete',deleteRoutes);
app.use('/api/edit',editRoutes);
app.use('/api/order',oderRoutes);
app.use('/api/build',buildRoutes);

module.exports = app;