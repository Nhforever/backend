const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const { timeStamp, log } = require('console');
const { JWT_SECRET } = require('../config/dotenvConfig').config;
const path = require('path');

// regisztráció
const register = (req, res) => {
    const { email, password, name } = req.body;
    
    const fullname = name;
    const errors = [];

    /*if (!validator.isEmail(email)) {
        errors.push({ error: 'Nem valós email' });
    }

    if (validator.isEmpty(name)) {
        errors.push({ error: 'Töltsd ki a nevet' });
    }

    if (!validator.isLength(password, { min: 6 })) {
        errors.push({ error: 'A jelszónak minimum 6 karakterből kell állnia' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }*/

    let currentDate = new Date();
    currentDate.setSeconds(Math.round(currentDate.getSeconds()));
    let time = currentDate.toISOString().split('.')[0];
    const salt = 10;

    bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba a sózáskor' });
        }
        const pic="logo.png";
        const sql = "INSERT INTO users (user_id, email, password, created_at, name,profile_pic,admin) VALUES (NULL, ?, ?, ?, ?,?,0)";

        //console.log(profile_pic); // Ellenőrzés: teljes fájlútvonal megjelenítése
        db.query(sql, [email, hash, time, name,pic], (err2, result) => {
            if (err2) {
                return res.status(500).json({ error: 'Az email már foglalt' });
            }

            // Az insertId az új felhasználó ID-ja
            const newUserId = result.insertId;

            // Az új felhasználó ID-jával beszúrjuk a user_info táblába
            const sql2 = "INSERT INTO `user_info` (userinfo_id, city, street, fullname, postcode, user_id) VALUES (NULL, NULL, NULL, ?, NULL, ?)";
            
            db.query(sql2, [fullname, newUserId], (err3, result2) => {
                if (err3) {
                    return res.status(500).json({ message: 'Hiba az SQL-ben' });
                }

                res.status(201).json({ message: 'Sikeres regisztráció' });
            });
        });
    });
};


// login
const login = (req, res) => {
    const { email, password } = req.body;
    const errors = [];
    if (!validator.isEmail(email)) {
        errors.push({ error: 'Add meg az email címet' });
    }

    if (validator.isEmpty(password)) {
        errors.push({ error: 'Add meg a jelszót' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const sql = 'SELECT * FROM users WHERE email LIKE ?';
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'A felhasználó nem található' });
        }

        const user = result[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
                const token = jwt.sign(
                    {
                        id: user.user_id
                    },
                    JWT_SECRET,
                    {
                        expiresIn: '1y'
                    }
                );
                console.log(token);

                // Token hozzáadása cookie-ként
                
                res.cookie('auth_token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'lax',
                    domain: 'techbay2.netlify.app',
                    path: '/',
                    maxAge: 3600000 * 24 * 31 * 11
                });
                console.log(req.user.id);
                return res.status(200).json({ message: 'Sikeres bejelentkezés' });
            } else {
                return res.status(401).json({ error: 'Rossz a jelszó' });
            }
        });
    });
};

// logout
const logout = (req, res) => {
    res.clearCookie('auth_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });
    res.status(200).json({ message: 'Sikeres kijelentkezés' });
};

// teszt
const test = (req, res) => {
    const user = req.user;
    return res.status(200).json({ message: 'bent vagy! ', user });
};

module.exports = { register, login, logout, test };