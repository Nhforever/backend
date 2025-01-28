const db = require('../models/db');
//a többi más kilisstázása(perifériák,nyomtató stb.)
const Getproducts_others = (req, res) => {
    const sql = 'SELECT * FROM products INNER JOIN categoryasdad ON products.cat_id = categoryasdad.cat_id WHERE categoryasdad.cat_id =2';

    db.query(sql,(err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }

        return res.status(200).json(result);
    });
};
//minden termék kilistázása
const Getproducts_all = (req, res) => {
    const sql = 'SELECT * FROM products';

    db.query(sql,(err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }

        return res.status(200).json(result);
    });
};
//minden config termék kilistázása ami aktív
const Getconfig_active = (req, res) => {
    const sql = 'SELECT * FROM pc_configs WHERE active=1';

    db.query(sql,(err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }

        return res.status(200).json(result);
    });
};
//minden config kilistázása
const Getconfig_all = (req, res) => {
    const sql = 'SELECT * FROM pc_configs';

    db.query(sql,(err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }

        return res.status(200).json(result);
    });
};
//cpu kilistázása
const Getproducts_cpus = (req, res) => {
    const sql = 'SELECT * FROM products INNER JOIN categoryasdad ON products.cat_id = categoryasdad.cat_id WHERE categoryasdad.cat_id =6';

    db.query(sql,(err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }

        return res.status(200).json(result);
    });
};
//alaplap kilistázása
const Getproducts_motherboards = (req, res) => {
    const sql = 'SELECT * FROM products INNER JOIN categoryasdad ON products.cat_id = categoryasdad.cat_id WHERE categoryasdad.cat_id =7';

    db.query(sql,(err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }

        return res.status(200).json(result);
    });
};
//gépház kilistázása
const Getproducts_houses = (req, res) => {
    const sql = 'SELECT * FROM products INNER JOIN categoryasdad ON products.cat_id = categoryasdad.cat_id WHERE categoryasdad.cat_id =8';

    db.query(sql,(err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }

        return res.status(200).json(result);
    });
};
//videókártya kilistázása
const Getproducts_gpus = (req, res) => {
    const sql = 'SELECT * FROM products INNER JOIN categoryasdad ON products.cat_id = categoryasdad.cat_id WHERE categoryasdad.cat_id =9';

    db.query(sql,(err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }

        return res.status(200).json(result);
    });
};
//ramok kilistázása
const Getproducts_rams = (req, res) => {
    const sql = 'SELECT * FROM products INNER JOIN categoryasdad ON products.cat_id = categoryasdad.cat_id WHERE categoryasdad.cat_id =10';

    db.query(sql,(err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }

        return res.status(200).json(result);
    });
};
//tápegységek kilistázása
const Getproducts_powersupplys = (req, res) => {
    const sql = 'SELECT * FROM products INNER JOIN categoryasdad ON products.cat_id = categoryasdad.cat_id WHERE categoryasdad.cat_id =11';

    db.query(sql,(err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }

        return res.status(200).json(result);
    });
};
//hddk kilistázása
const Getproducts_hdds = (req, res) => {
    const sql = 'SELECT * FROM products INNER JOIN categoryasdad ON products.cat_id = categoryasdad.cat_id WHERE categoryasdad.cat_id =12';

    db.query(sql,(err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }

        return res.status(200).json(result);
    });
};
//ssdk kilistázása
const Getproducts_ssds = (req, res) => {
    const sql = 'SELECT * FROM products INNER JOIN categoryasdad ON products.cat_id = categoryasdad.cat_id WHERE categoryasdad.cat_id =13';

    db.query(sql,(err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }

        return res.status(200).json(result);
    });
};
//cpu hűtők kilistázása
const Getproducts_cpucoolers = (req, res) => {
    const sql = 'SELECT * FROM products INNER JOIN categoryasdad ON products.cat_id = categoryasdad.cat_id WHERE categoryasdad.cat_id =14';

    db.query(sql,(err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }

        return res.status(200).json(result);
    });
};

module.exports = { Getproducts_others,Getproducts_all,Getconfig_active,Getconfig_all,Getproducts_cpus,Getproducts_motherboards,Getproducts_houses,Getproducts_gpus,Getproducts_rams,Getproducts_powersupplys,Getproducts_hdds,Getproducts_ssds,Getproducts_cpucoolers };