const db = require('../models/db');

//termék kosárba pakolása és kosár létrehozása
const takeProduct = (req, res) => {
    const userid=req.user.id;
    const cart_id=userid+100;
    const sql2="INSERT IGNORE INTO cart (cart_id, user_id) VALUES (?, ?);";
    db.query(sql2, [cart_id,userid], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }
        return res.status(200).json({ message: 'Sikeresen letrehoztad a kosarad! ' });
    });
    
    const { product_id} = req.params;
    const {quantity}=req.body;
    const sql5="SELECT * FROM products WHERE product_id=?;"
    db.query(sql5,[product_id],(err,result)=>{
        if(err){
            return res.status(500).json({error:"SQL Hiba" + err})
        }
        if(result.lenght===0){
            return res.status(404).json({error:'Nincs ilyen termék!'});
        }
        if(result>0){
            const catid=result.cat_id;
            const sql="INSERT INTO `cart_items` (`cart_item_id`, `cart_id`, `product_id`, `quantity`, `cat_id`) VALUES (NULL,?,?,?,?)";
                db.query(sql, [cart_id,product_id,quantity,catid], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Hiba az SQL-ben' });
                }
        });
        return res.status(200).json({ message: 'Sikeresen frissítetted a kosaradat! ' });
        }
    })
    
};
//termék kosárbol kitörlése és a kosár törlése
const RemoveProduct = (req, res) => {
    const user=100;
    const userid=req.user.id;
    const cart_id=userid+user;
    const product_id=req.params.product_id;
    //console.log(product_id);a
    const sql2="DELETE FROM `cart_items` WHERE `product_id` = ?";
    db.query(sql2, [product_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Hiba az SQL-ben' }); 
        }
        //return res.status(200).json({ message: 'Sikeresen eltávolítottad a terméket a kosaradbol! ' });
    });
    const sql="SELECT COUNT(*) FROM cart_items WHERE cart_id = ?";
    const sql1="DELETE FROM `cart` WHERE `cart_id` = ?;";
    db.query(sql, [cart_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }
        const elsoelem=result[0];
        const szam=elsoelem['COUNT(*)'];
        console.log(szam);
       
        if(szam==0){
            db.query(sql1,[cart_id],(err,result)=>{
                if (err) {
                    return res.status(500).json({ error: 'Hiba az SQL-ben' });
                }
            })
        }

        return res.status(200).json({ message: 'Sikeresen frissítetted a kosaradat! ' });
    });
};
const ShowCart = (req, res) => {
    console.log(req.user);
    console.log(req.user.id); 
    const userid=req.user.id;
    const user=100;
    const cart_id=userid+user;
    const sql2="SELECT * FROM cart_items WHERE cart_id = ?";
    db.query(sql2, [cart_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Hiba az SQL-ben' }); 
        }
        return res.status(201).json(result);
    });
};
module.exports={ takeProduct,RemoveProduct,ShowCart };