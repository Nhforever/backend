const db = require('../models/db');

//termék kosárba pakolása és kosár létrehozása
const takeProduct = (req, res) => {
    const userid = req.user.id;
    const cart_id = userid + 100;
    const { product_id } = req.params;
    const { quantity } = req.body;

    if (!product_id || isNaN(product_id) || !quantity || isNaN(quantity)) {
        return res.status(400).json({ error: 'Hibás termék ID vagy mennyiség!' });
    }

    const sql2 = "INSERT IGNORE INTO cart (cart_id, user_id) VALUES (?, ?);";
    const sql5 = "SELECT * FROM products WHERE product_id = ?;";
    const sql6 = "SELECT * FROM pc_configs WHERE pc_id = ?;";
    const sql = "INSERT INTO cart_items (cart_item_id, cart_id, product_id, quantity, cat_id) VALUES (NULL, ?, ?, ?, ?)";

    db.query(sql2, [cart_id, userid], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }

        db.query(sql5, [product_id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "SQL Hiba: " + err });
            }

            if (result.length === 0) {
                // Ha a products táblában nincs meg, akkor keresünk a pc_configs táblában
                db.query(sql6, [product_id], (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ error: 'Hiba az SQL-ben' }); 
                    }
                    if (result.length === 0) {
                        return res.status(404).json({ message: 'Nincs ilyen termék!' });
                    } else {
                        const catid = result[0].cat_id; // PC config kategória azonosítója
                        const pc_id = product_id;

                        db.query(sql, [cart_id, pc_id, quantity, catid], (err, result) => {
                            if (err) {
                                return res.status(500).json({ error: 'Hiba az SQL-ben' });
                            }
                            return res.status(200).json({ message: 'Sikeresen frissítetted a kosaradat!' });
                        });
                    }
                });
                return;
            }

            const catid = result[0].cat_id;

            db.query(sql, [cart_id, product_id, quantity, catid], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Hiba az SQL-ben' });
                }
                return res.status(200).json({ message: 'Sikeresen frissítetted a kosaradat!' });
            });
        });
    });
};


//termék kosárbol kitörlése és a kosár törlése
const RemoveProduct = (req, res) => {
    const user = 100;
    const userid = req.user.id;
    const cart_id = userid + user;
    const product_id = req.params.product_id;
    console.log(cart_item_id);

    const sql2 = "DELETE FROM `cart_items` WHERE `product_id` = ?";
    db.query(sql2, [product_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }

        const sql = "SELECT COUNT(*) AS count FROM cart_items WHERE cart_id = ?";
        db.query(sql, [cart_id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Hiba az SQL-ben' });
            }

            const szam = result[0].count; // Helyes értékelérés
            console.log(szam);

            if (szam == 0) {
                const sql1 = "DELETE FROM `cart` WHERE `cart_id` = ?";
                db.query(sql1, [cart_id], (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: 'Hiba az SQL-ben' });
                    }
                    /*return res.status(200).json({ message: 'Sikeresen törölted az üres kosarat!' });*/
                });
            } else {
                /*return res.status(200).json({ message: 'Sikeresen eltávolítottad a terméket a kosárból!' });*/
            }
        });
    });
};

const ShowCart = (req, res) => {
    console.log(req.user);
    console.log(req.user.id); 
    const userid=req.user.id;
    const user=100;
    const cart_id=userid+user;
    const sql2="SELECT a.*,b.*,c.* FROM cart_items a LEFT JOIN products b ON a.product_id = b.product_id LEFT JOIN pc_configs c ON a.product_id = c.pc_id WHERE a.cart_id = ?;";
    db.query(sql2, [cart_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Hiba az SQL-ben' }); 
        }
        const cleanedResult = result.map(row => {
            return Object.fromEntries(
                Object.entries(row).filter(([_, value]) => value !== null)
            );
        });
    
        return res.status(201).json(cleanedResult);
    });
};
module.exports={ takeProduct,RemoveProduct,ShowCart };