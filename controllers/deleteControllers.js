const db = require('../models/db');
//termék törlése
const deleteProduct = (req, res) => {
    const product_id=req.params.product_id;

    const sql = "DELETE FROM `products` WHERE `product_id`= ?;";
    db.query(sql,product_id, (err, result) => {
        if (err) {
            console.error('SQL Hiba:', err);
            return res.status(500).json({ error: 'Hiba az SQL-ben', details: err });
        }

        return res.status(200).json({ message: 'Sikeresen törölted a terméket ' });
    });
};
//előre összerakott gép törlése
const deleteConfig = (req, res) => {
    const pc_id=req.params.pc_id;
    console.log(pc_id);
    const sql = "DELETE FROM `pc_configs` WHERE pc_id=?";
    db.query(sql,pc_id, (err, result) => {
        if (err) {
            console.error('SQL Hiba:', err);
            return res.status(500).json({ error: 'Hiba az SQL-ben', details: err });
        }

        return res.status(200).json({ message: 'Sikeresen törölted a terméket ' });
    });
};
module.exports={ deleteProduct,deleteConfig };