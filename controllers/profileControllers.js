const db = require('../models/db');
const getUsername=(req, res) => {
    const user_id = req.user.id;
    console.log(user_id);
    //const sql = 'SELECT name FROM users WHERE user_id=?';
    const sql = 'SELECT * FROM user_info INNER JOIN users ON users.user_id=user_info.user_id WHERE users.user_id=?;';

    db.query(sql, [user_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }

        return res.status(200).json(result);
    });
    /*db.query(sql2, [user_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }

        //return res.status(200).json(result);
    });*/
};
const editProfilePic = (req, res) => {
    const user_id = req.user.id;
    const profile_pic = req.file ? req.file.filename : null;
    
    const sql = 'UPDATE users SET profile_pic = COALESCE(NULLIF(?, ""), profile_pic) WHERE user_id = ?';

    db.query(sql, [profile_pic, user_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }

        return res.status(200).json({ message: 'Profilkép frissítve ' });
    });
};
const editData=(req, res) => {
    const{city,street,fullname,postcode}=req.body;
    const user_id = req.user.id;
    //console.log(user_id);
    //console.log(city,street,fullname,postcode);
    
    const sql = "UPDATE user_info SET city=?,street=?,fullname=?,postcode=? WHERE user_id=?";
    const sql2="UPDATE `users` SET name=? WHERE user_id=?;"
    db.query(sql, [city,street,fullname,postcode, user_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }
        console.log(result.info)

        //return res.status(200).json({ message: 'Adatok frissítve ' });
        db.query(sql2,[fullname,user_id],(err,result)=>{
            if(err){
                return res.status(500).json({error:'Hiba az SQL-ben'});
            }
            return res.status(200).json({message:'Sikeres frissítés!'});
        })
    });
    
};
const myData=(req, res) => {
    const user_id = req.user.user_id;
    //console.log("userid: ",user_id);
    const sql = "SELECT postcode,city,street,fullname FROM user_info WHERE user_id=?";

    db.query(sql, user_id, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
            
        }
        //console.log(result.info);

        return res.status(201).json(result);
    });
}
const orderHistory=(req, res) => {
    const user_id = req.user.id;
    const order_id=user_id+100;
    //console.log("userid: ",user_id);
    const sql = "SELECT * FROM order_items_archive WHERE order_id=?;";

    db.query(sql, order_id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }
        //console.log(result.info);

        return res.status(201).json(result);
    });
}

const getAdmin=(req, res) => {
    const user_id = req.user.id;
    //console.log("userid: ",user_id);
    const sql = "SELECT admin FROM users WHERE user_id=?;";
    console.log(user_id) ;
    db.query(sql, user_id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }
        //console.log(result.info);

        return res.status(201).json(result);
    });
}
module.exports = {  editProfilePic,editData,myData,orderHistory,getUsername,getAdmin };