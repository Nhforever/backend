const db = require('../models/db');

// Kosárból rendelésbe átemelés
const itemsOrder = (req, res) => {
    const userId = req.user.id;
    const orderId = userId + 100;

    // Előző rendelés tételeinek törlése
    const deleteSql = "DELETE FROM order_items WHERE order_id = ?";
    db.query(deleteSql, [orderId], (err) => {
        if (err) {
            console.error("Hiba az előző rendelés törlésekor:", err);
            return res.status(500).json({ error: "Nem sikerült törölni az előző rendelést." });
        }

        // Termékek kosárból rendelésbe másolása
        const sql1 = `
            INSERT INTO order_items (order_id, product_id, quantity, unit_price)
            SELECT 
                ? AS order_id, 
                cart_items.product_id, 
                cart_items.quantity, 
                products.price AS unit_price
            FROM 
                cart_items
            INNER JOIN 
                products ON cart_items.product_id = products.product_id
            WHERE 
                cart_items.cart_id = ?;
        `;

        db.query(sql1, [orderId, orderId], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Hiba a termékek beszúrásánál.' });
            }

            // PC konfigurációk beszúrása (ha van ilyen is a kosárban)
            const sql2 = `
                INSERT INTO order_items (order_id, product_id, quantity, unit_price)
                SELECT 
                    ? AS order_id, 
                    cart_items.product_id, 
                    cart_items.quantity, 
                    pc_configs.pc_price AS unit_price
                FROM 
                    cart_items
                INNER JOIN 
                    pc_configs ON cart_items.product_id = pc_configs.pc_id
                WHERE 
                    cart_items.cart_id = ?;
            `;

            db.query(sql2, [orderId, orderId], (err, result) => {
                if (err) {
                    console.error("PC-konfig beszúrási hiba:", err);
                    // nem állítjuk meg, mehet tovább a folyamat
                }

                return res.status(200).json({ message: 'Sikeresen áthelyezve a kosárból a rendelésbe.' });
            });
        });
    });
};

// Rendelés véglegesítése
const allOrder = (req, res) => {
    const userId = req.user.id;
    const orderId = userId + 100;

    let currentDate = new Date();
    currentDate.setSeconds(Math.round(currentDate.getSeconds()));
    let time = currentDate.toISOString().split('.')[0];

    // Összeg lekérdezése
    const sqlSum = "SELECT SUM(unit_price) AS total FROM order_items WHERE order_id = ?;";
    db.query(sqlSum, [orderId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Hiba az összeg lekérdezésekor.' });
        }

        const totalAmount = result[0].total || 0;

        // Rendelés beszúrása
        const sqlInsertOrder = `
            INSERT INTO orders (order_id, user_id, order_date, total_amount)
            VALUES (NULL, ?, ?, ?);
        `;

        db.query(sqlInsertOrder, [userId, time, totalAmount], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Hiba a rendelés beszúrásakor.' });
            }

            const lastBestId = result.insertId;

            // Archiválás
            const sqlArchive = `
                INSERT INTO order_items_archive (order_id, product_id, quantity, unit_price, order_time, status, orders_order_id)
                SELECT 
                    ? AS order_id,
                    oi.product_id,
                    oi.quantity,
                    oi.unit_price,
                    o.order_date,
                    1,
                    ? 
                FROM order_items oi
                INNER JOIN orders o ON oi.order_id = ?
                WHERE oi.order_id = ?;
            `;

            db.query(sqlArchive, [orderId, lastBestId, orderId, orderId], (err) => {
                if (err) {
                    console.error("Archiválási hiba:", err);
                    return res.status(500).json({ error: "Hiba az archiválás során." });
                }

                // Kosár törlése
                const sqlDeleteItems = "DELETE FROM cart_items WHERE cart_id = ?;";
                db.query(sqlDeleteItems, [orderId], (err) => {
                    if (err) console.error("Kosár elemek törlése hiba:", err);
                });

                const sqlDeleteCart = "DELETE FROM cart WHERE cart_id = ?;";
                db.query(sqlDeleteCart, [orderId], (err) => {
                    if (err) console.error("Kosár törlése hiba:", err);
                });

                // Order_items törlése
                const sqlDeleteOrderItems = "DELETE FROM order_items WHERE order_id = ?;";
                db.query(sqlDeleteOrderItems, [orderId], (err) => {
                    if (err) console.error("order_items törlése hiba:", err);
                });

                return res.status(200).json({
                    message: 'Rendelés véglegesítve és archiválva.',
                    orderId: lastBestId
                });
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
//rendelés elfogadása (Admin)
const confirmOrder=(req, res) => {
    const order_Id = req.params.order_id;
    console.log(order_Id);
    //console.log(lastBestId);
    const sql1 = "UPDATE order_items_archive SET status=2 WHERE order_id=?";
    db.query(sql1,order_Id,(err,result)=>{
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Hiba az SQL végrehajtása során.' });
        }
        /*const elsoelem=result[0];
        const szam=elsoelem['SUM(`unit_price`)'];
        console.log(szam);*/
        return res.status(200).json({ message: 'Sikeresen elfogadtad a rendelést! ' });
    });
    /*db.query(sql2,order_Id,(err,result)=>{
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Hiba az SQL végrehajtása során.' });
        }
        console.log(result);
        //return res.status(200).json({ message: 'Sikeresen inaktív lett a rendelés ' });
    })*/
}
module.exports={ itemsOrder,allOrder,cancelOrder,confirmOrder };