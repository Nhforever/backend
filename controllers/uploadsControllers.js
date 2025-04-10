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
    const { product_name, price, in_stock, cat_id, sale,sale_,description
    } = req.body;
    const product_pic = req.file ? req.file.filename : null;
    if(product_pic===null){
        return res.status(400).json({error:'Nincs kép te cigány!'})
    }
    console.log("név: "+product_name, "típus: "+typeof(product_name)+"\nprice: "+price, "típus: "+typeof(price)+"\ninstock: "+in_stock, "típus: "+typeof(in_stock)+"\ncatid: "+cat_id, "típus: "+typeof(cat_id)+"\nsale: "+sale, "típus: "+typeof(sale)+"\npic: "+product_pic, "típus: "+typeof(product_pic)+"\ndescription: "+description,"típus: "+typeof(description));
    // Alap validálás
    if (!product_name || !price || !in_stock || !cat_id || !sale ||!description) {
        return res.status(400).json({ error: 'Minden mező kitöltése kötelező!' });
    }

    

    const sql = "INSERT INTO `products` (`product_id`, `product_name`, `price`, `in_stock`, `cat_id`, `sale`, `product_pic`,sale_,description) VALUES (NULL, ?, ?, ?, ?, ?, ?,?,?)";
    db.query(sql, [product_name, parseFloat(price), parseInt(in_stock, 10), parseInt(cat_id, 10), parseInt(sale, 10), product_pic,sale_,description], (err, result) => {
        if (err) {
            console.error('SQL Hiba:', err);
            return res.status(500).json({ error: 'Hiba az SQL-ben', details: err });
        }

        return res.status(200).json({ message: 'Sikeresen feltöltöttél egy új terméket!' });
    });
};
//előre összeállított gép feltöltése
const uploadConfig=(req, res) => {
    const cat_id=1;
    const { cpu,mother_board,house,ram,gpu,hdd,ssd,power_supply,cpu_cooler,pc_price,in_stock,sale,sale_,pc_name,pc_description,active } = req.body;

    if(!in_stock){
        return res.status(404).json({message:'A darabszám kötelező!'})
    }

    const pc_pic = req.file ? req.file.filename : null;

    const sql = "INSERT INTO pc_configs (pc_id, cpu, mother_board, house, ram, gpu, hdd, ssd, power_supply,cpu_cooler, pc_price, in_stock, cat_id, sale,sale_, pc_name, pc_pic, pc_description,active)VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?);";
    db.query(sql, [cpu,mother_board,house,ram,gpu,hdd,ssd,power_supply,cpu_cooler,pc_price,in_stock,cat_id,sale,sale_,pc_name,pc_pic,pc_description,active], (err, result) => {
        if (err) {
            console.error('SQL Hiba:', err);
            return res.status(500).json({ error: 'Hiba az SQL-ben', details: err });
        }
        console.log(result.info);
        return res.status(200).json({ message: 'Sikeresen feltöltöttél egy új configot!' });
    });
};

module.exports={uploadCategory,uploadProduct,uploadConfig};