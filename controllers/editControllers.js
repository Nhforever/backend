const db = require('../models/db');
//termék módosítása
const editProduct = (req, res) => {
    const product_id=req.params.product_id;
    const { product_name, price, in_stock, cat_id, sale,sale_ } = req.body;
    const product_pic = req.file ? req.file.filename : null;
    const sql = 'UPDATE products SET product_name= ?,price= ?,in_stock= ?,cat_id= ?,sale= ?,product_pic= COALESCE(NULLIF(?, ""), product_pic),sale_= ? WHERE product_id=?';
    console.log(product_id);
    console.log(typeof(product_id));
    db.query(sql,[product_name,price,in_stock,cat_id,sale,product_pic,sale_,product_id], (err, result) => {
        if (err) {
            console.error('SQL Hiba:', err);
            return res.status(500).json({ error: 'Hiba az SQL-ben', details: err });
        }
        console.log(result.info);
        console.log(result);
        return res.status(200).json({ message: 'Sikeresen módosítottad a terméket ' });
    });
};
const editConfig=(req, res) => {
    const pc_id=req.params.pc_id;
    const { cpu,mother_board,house,ram,gpu,hdd,ssd,power_supply,pc_price,cpu_cooler,in_stock,cat_id,sale,sale_,pc_name,pc_description } = req.body;

    const pc_pic = req.file ? req.file.filename : null;
    const sql = 'UPDATE pc_configs SET cpu=?,mother_board=?,house=?,ram=?,gpu=?,hdd=?,ssd=?,power_supply=?,pc_price=?,cpu_cooler=?,in_stock=?,cat_id=?,sale=?,sale_=?,product_name=?,product_pic=COALESCE(NULLIF(?, ""), product_pic),description=?, WHERE product_id=?;'
    db.query(sql,[cpu,mother_board,house,ram,gpu,hdd,ssd,power_supply,pc_price,cpu_cooler,in_stock,cat_id,sale,sale_,pc_name,pc_pic,pc_description,pc_id], (err, result) => {
        if (err) {
            console.error('SQL Hiba:', err);
            return res.status(500).json({ error: 'Hiba az SQL-ben', details: err });
        }
        console.log(result.info);
        return res.status(200).json({ message: 'Sikeresen módosítottad a terméket ' });
    });
};
const active=(req, res) => {
    const pc_id=req.params.pc_id;

    const sql = 'UPDATE pc_configs SET active=1 WHERE pc_id=?;'
    db.query(sql,[pc_id], (err, result) => {
        if (err) {
            console.error('SQL Hiba:', err);
            return res.status(500).json({ error: 'Hiba az SQL-ben', details: err });
        }
        console.log(result.info);
        return res.status(200).json({ message: 'Sikeresen aktiváltad ' });
    });
};

const inactive=(req, res) => {
    const pc_id=req.params.pc_id;

    const sql = 'UPDATE pc_configs SET active=0 WHERE pc_id=?;'
    db.query(sql,[pc_id], (err, result) => {
        if (err) {
            console.error('SQL Hiba:', err);
            return res.status(500).json({ error: 'Hiba az SQL-ben', details: err });
        }
        console.log(result.info);
        return res.status(200).json({ message: 'Sikeresen inaktiváltad ' });
    });
};

module.exports={ editProduct,editConfig,active,inactive };