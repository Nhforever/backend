const db = require('../models/db');

const itemsOrder = (req, res) => {
    const userId = req.user.id;
    const orderId = userId + 100;

    // Először töröljük a meglévő rendelési tételeket (ha vannak)
    const deleteSql = "DELETE FROM order_items WHERE order_id = ?";
    db.query(deleteSql, [orderId], (err) => {
        if (err) {
            console.error("Törlési hiba:", err);
            return res.status(500).json({ error: "Hiba a régi rendelés törlésekor." });
        }

        // Termékek beillesztése a products táblából
        const insertProducts = `
            INSERT INTO order_items (order_id, product_id, quantity, unit_price)
            SELECT ?, ci.product_id, ci.quantity, p.price
            FROM cart_items ci
            INNER JOIN products p ON ci.product_id = p.product_id
            WHERE ci.cart_id = ?;
        `;

        db.query(insertProducts, [orderId, orderId], (err) => {
            if (err) {
                console.error("Termékek beszúrási hiba:", err);
                return res.status(500).json({ error: "Hiba a termékek rendelésbe helyezésénél." });
            }

            // PC konfigurációk beillesztése a pc_configs táblából
            const insertPCs = `
                INSERT INTO order_items (order_id, product_id, quantity, unit_price)
                SELECT ?, ci.product_id, ci.quantity, pc.pc_price
                FROM cart_items ci
                INNER JOIN pc_configs pc ON ci.product_id = pc.pc_id
                WHERE ci.cart_id = ?;
            `;

            db.query(insertPCs, [orderId, orderId], (err) => {
                if (err) {
                    console.error("PC konfiguráció beszúrási hiba:", err);
                    return res.status(500).json({ error: "Hiba a konfiguráció rendelésbe helyezésénél." });
                }

                return res.status(200).json({ message: 'Sikeresen áthelyezve a kosárból a rendelésbe.' });
            });
        });
    });
};

const allOrder = (req, res) => {
    const userId = req.user.id;
    const orderId = userId + 100;
    const currentDate = new Date().toISOString().split('.')[0];

    const sqlSum = "SELECT SUM(unit_price) AS total FROM order_items WHERE order_id = ?;";
    db.query(sqlSum, [orderId], (err, result) => {
        if (err) {
            console.error("Összegzés hiba:", err);
            return res.status(500).json({ error: "Hiba az összeg lekérdezésekor." });
        }

        const totalAmount = result[0].total || 0;

        const insertOrder = `
            INSERT INTO orders (order_id, user_id, order_date, total_amount)
            VALUES (NULL, ?, ?, ?);
        `;
        db.query(insertOrder, [userId, currentDate, totalAmount], (err, result) => {
            if (err) {
                console.error("Rendelés beszúrás hiba:", err);
                return res.status(500).json({ error: "Hiba a rendelés beszúrásakor." });
            }

            const newOrderId = result.insertId;

            // Archiválás
            const archiveSQL = `
                INSERT INTO order_items_archive (order_id, product_id, quantity, unit_price, order_time, status, orders_order_id)
                SELECT ?, oi.product_id, oi.quantity, oi.unit_price, ?, 1, ?
                FROM order_items oi
                WHERE oi.order_id = ?;
            `;

            db.query(archiveSQL, [orderId, currentDate, newOrderId, orderId], (err) => {
                if (err) {
                    console.error("Archiválási hiba:", err);
                    return res.status(500).json({ error: "Hiba az archiválás során." });
                }

                // Törlés a cart és order_items táblákból
                const deleteCartItems = "DELETE FROM cart_items WHERE cart_id = ?";
                const deleteCart = "DELETE FROM cart WHERE cart_id = ?";
                const deleteOrderItems = "DELETE FROM order_items WHERE order_id = ?";

                db.query(deleteCartItems, [orderId], (err) => {
                    if (err) console.error("Kosár elemek törlése hiba:", err);
                });

                db.query(deleteCart, [orderId], (err) => {
                    if (err) console.error("Kosár törlése hiba:", err);
                });

                db.query(deleteOrderItems, [orderId], (err) => {
                    if (err) console.error("Order_items törlése hiba:", err);
                });

                return res.status(200).json({ message: "Rendelés véglegesítve és archiválva." });
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