const db = require('../models/db');
//kosárbol a rendelés összegzésére config
let lastBestId = 0;

//kosárbol a rendelés összegzésére product
const itemsOrder = (req, res) => {
    const userId = req.user.id; // A felhasználó ID-ja
    const orderId = userId + 100; // Példa: rendelési azonosító generálása
    const sql = `INSERT INTO order_items (order_id, product_id, quantity, unit_price)
    SELECT 
        ? AS order_id, 
        cart_items.product_id, 
        cart_items.quantity, 
        products.price AS unit_price
    FROM 
        cart_items
    INNER JOIN 
        products 
    ON 
        cart_items.product_id = products.product_id
    WHERE 
        cart_items.cart_id = ?;
    `;

    db.query(sql, [orderId, orderId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Hiba az SQL végrehajtása során.' });
        }
        console.log(result);
        // Sikeres beszúrás esetén válasz
        console.log('Beszúrt sorok:', result.affectedRows);
        return res.status(200).json({ message: 'Sikeresen áthelyezve a kosárból a rendelésbe.' });
        
    });
    const sql2 = `INSERT INTO order_items (order_id, product_id, quantity, unit_price)
    SELECT 
        ? AS order_id, 
        cart_items.product_id, 
        cart_items.quantity, 
        pc_configs.price AS unit_price
    FROM 
        cart_items
    INNER JOIN 
        pc_configs 
    ON 
        cart_items.product_id = pc_configs.pc_id
    WHERE 
        cart_items.cart_id = ?;
    `;

    db.query(sql2, [orderId, orderId], (err, result) => {
        if (err) {
            console.error(err);
            //return res.status(500).json({ error: 'Hiba az SQL végrehajtása során.' });
        }
        
        // Sikeres beszúrás esetén válasz
        console.log('Beszúrt sorok:', result.affectedRows);
        //return res.status(200).json({ message: 'Sikeresen áthelyezve a kosárból a rendelésbe.' });
        
    });
}
//rendelés véglegesítése
const allOrder=(req, res) => {
    const userId = req.user.id; // A felhasználó ID-ja
    const orderId = userId + 100; // Példa: rendelési azonosító generálása
    let currentDate = new Date();
    currentDate.setSeconds(Math.round(currentDate.getSeconds()));
    let time = currentDate.toISOString().split('.')[0];
    
    const sql = "SELECT SUM(`unit_price`) FROM `order_items` WHERE order_id=?;";
    const sql1 = "INSERT INTO orders(order_id, user_id, order_date, total_amount) VALUES (NULL,?,?,?);";
    
    db.query(sql, orderId, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Hiba az SQL végrehajtása során.' });
        }
    
        const elsoelem = result[0];
        const szam = elsoelem['SUM(`unit_price`)'];
    
        db.query(sql1, [orderId, time, szam], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Hiba az SQL végrehajtása során.' });
            }
    
            const lastBestId = result.insertId;
            console.log("lastBestId: " + lastBestId);
    
            // Elmentjük a req objektumba, hogy a következő kérésnél elérhető legyen
            console.log("lastbestid_v2: "+lastBestId);
    
            const sql2 = "DELETE FROM cart_items WHERE cart_id = ?;";
    
    db.query(sql2, orderId, (err, result) => {
        if (err) {
            console.error(err);
            //return res.status(500).json({ error: 'Hiba az SQL végrehajtása során.' });
        }
    });
    
    
    const sql3="DELETE FROM `cart` WHERE `cart_id` = ?;";
    
    db.query(sql3,orderId,(err,result)=>{
        if(err){
            console.error(err);
            //return res.status(500).json({ error: 'Hiba az SQL végrehajtása során.' });
        }
    });
    
    //console.log("második"+orderId);
    const sql4 = `
    INSERT INTO order_items_archive (order_id, product_id, quantity, unit_price, order_time,status,orders_order_id)
    SELECT 
        ? AS order_id, 
        order_items.product_id, 
        order_items.quantity, 
        order_items.unit_price,
        orders.order_date,
        1,
        ?
    FROM 
        order_items
    INNER JOIN 
        orders ON order_items.order_id = orders.user_id
    WHERE 
        order_items.order_id = ?;
`;

db.query(sql4, [orderId, lastBestId,orderId], (err, result) => {
    if (err) {
        console.error('SQL Hiba:', err);  // Logoljuk a hibaüzenetet
        res.status(500).json({ message: 'Hiba az SQL-ben', error: err });
        //return;  // Azonnal térj vissza, ha hiba van
    }
    console.log('SQL Eredmény:', result);  // Nézd meg az eredményt
    //res.status(201).json({ message: 'Sikeresen áthelyezted az archiváltba' });
    const sql5="DELETE FROM `order_items` WHERE `order_id`=?"
db.query(sql5,[orderId,orderId],(err,result)=>{
    if (err) {
        console.error('SQL Hiba:', err);  // Logoljuk a hibaüzenetet
        //res.status(500).json({ message: 'Hiba az SQL-ben', error: err });
        //return;  // Azonnal térj vissza, ha hiba van
    }
    //console.log('SQL Eredmény:', result);  // Nézd meg az eredményt
    //res.status(201).json({ message: 'Sikeresen áthelyezted az archiváltba' });
})
});
            // Válasz a frontendre
            return res.status(200).json({ 
                message: 'Sikeresen áthelyezve a kosárból a rendelésbe.',
            });
            
        });
    });
};
//rendelés visszavonása
const cancelOrder=(req, res) => {
    const order_Id = req.params.order_id;
    console.log(order_Id);
    //console.log(lastBestId);
    const sql1 = "DELETE FROM `orders` WHERE order_id=?";
    db.query(sql1,order_Id,(err,result)=>{
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Hiba az SQL végrehajtása során.' });
        }
        /*const elsoelem=result[0];
        const szam=elsoelem['SUM(`unit_price`)'];
        console.log(szam);*/
        return res.status(200).json({ message: 'Sikeresen törölted a rendelésed ' });
    });
    const sql2="UPDATE order_items_archive SET status=0 WHERE orders_order_id=?";
    console.log("aktid ",lastBestId);
    db.query(sql2,order_Id,(err,result)=>{
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Hiba az SQL végrehajtása során.' });
        }
        console.log(result);
        //return res.status(200).json({ message: 'Sikeresen inaktív lett a rendelés ' });
    })
}
module.exports={ itemsOrder,allOrder,cancelOrder };