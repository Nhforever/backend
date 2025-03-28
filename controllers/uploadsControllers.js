const db = require('../models/db');
//kategória feltöltése
const uploadCategory=(req, res) => {
    const { category_name } = req.body;
    const sql="INSERT INTO `categoryasdad`(`cat_id`, `category_name`) VALUES (NULL,?)";
    db.query(sql, [category_name], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }

        return res.status(200).json({ message: 'Sikeresen felvettél egy új kategóriát ' });
    });
};
//termék feltöltése
const uploadProduct = (req, res) => {
    const { product_name, price, in_stock, cat_id, sale,sale_,product_description
    } = req.body;

    // Alap validálás
    if (!product_name || !price || !in_stock || !cat_id || !sale ||!description) {
        return res.status(400).json({ error: 'Minden mező kitöltése kötelező!' });
    }

    const product_pic = req.file ? req.file.filename : null;

    const sql = "INSERT INTO `products` (`product_id`, `product_name`, `price`, `in_stock`, `cat_id`, `sale`, `product_pic`,sale_,product_description) VALUES (NULL, ?, ?, ?, ?, ?, ?,?,?)";
    db.query(sql, [product_name, parseFloat(price), parseInt(in_stock, 10), parseInt(cat_id, 10), parseInt(sale, 10), product_pic,sale_,product_description], (err, result) => {
        if (err) {
            console.error('SQL Hiba:', err);
            return res.status(500).json({ error: 'Hiba az SQL-ben', details: err });
        }

        return res.status(200).json({ message: 'Sikeresen feltöltöttél egy új terméket!' });
    });
};
//előre összeállított gép feltöltése
const uploadConfig=(req, res) => {
    const { cpu,mother_board,house,ram,gpu,hdd,ssd,power_supply,cpu_cooler,price,in_stock,cat_id,sale,sale_,config_name,description,active } = req.body;

    const config_pic = req.file ? req.file.filename : null;

    const sql = "INSERT INTO pc_configs (pc_id, cpu, mother_board, house, ram, gpu, hdd, ssd, power_supply,cpu_cooler, price, in_stock, cat_id, sale,sale_, config_name, config_pic, description,active)VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?);";
    db.query(sql, [cpu,mother_board,house,ram,gpu,hdd,ssd,power_supply,cpu_cooler,price,in_stock,cat_id,sale,sale_,config_name,config_pic,description,active], (err, result) => {
        if (err) {
            console.error('SQL Hiba:', err);
            return res.status(500).json({ error: 'Hiba az SQL-ben', details: err });
        }
        console.log(result.info);
        return res.status(200).json({ message: 'Sikeresen feltöltöttél egy új configot!' });
    });
};

module.exports={uploadCategory,uploadProduct,uploadConfig};