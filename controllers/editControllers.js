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
    const { cpu,mother_board,house,ram,gpu,hdd,ssd,power_supply,price,cpu_cooler,in_stock,cat_id,sale,sale_,config_name,description,active } = req.body;

    const config_pic = req.file ? req.file.filename : null;
    const sql = 'UPDATE pc_configs SET cpu=?,mother_board=?,house=?,ram=?,gpu=?,hdd=?,ssd=?,power_supply=?,price=?,cpu_cooler=?,in_stock=?,cat_id=?,sale=?,sale_=?,config_name=?,config_pic=COALESCE(NULLIF(?, ""), config_pic),description=?,active=? WHERE pc_id=?;'
    db.query(sql,[cpu,mother_board,house,ram,gpu,hdd,ssd,power_supply,price,cpu_cooler,in_stock,cat_id,sale,sale_,config_name,config_pic,description,active,pc_id], (err, result) => {
        if (err) {
            console.error('SQL Hiba:', err);
            return res.status(500).json({ error: 'Hiba az SQL-ben', details: err });
        }
        console.log(result.info);
        return res.status(200).json({ message: 'Sikeresen módosítottad a terméket ' });
    });
};
module.exports={ editProduct,editConfig };