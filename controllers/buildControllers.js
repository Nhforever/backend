const db = require('../models/db');

const buildPc_cpu = (req, res) => {
    const userid=req.user.id;
    const cpu=req.body;
    const id=1000;
    const pc_id=userid+id;
    const sql="UPDATE Yourbuild SET cpu=? WHERE pc_id=? ;";
    db.query(sql, [cpu.cpu,pc_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }
        console.log(cpu.cpu,pc_id);
        return res.status(200).json({/* message: 'Sikeresen hozzáadtad a processzort '*/ result});
    });
    const sql2='UPDATE Yourbuild_price JOIN Yourbuild ON Yourbuild_price.pc_id = Yourbuild.pc_id JOIN products ON Yourbuild.cpu = products.product_id SET Yourbuild_price.cpu_price = products.price WHERE Yourbuild_price.pc_id = ?;';
    const sql3='UPDATE `Yourbuild_price` SET `price`=`cpu_price`+`motherboard_price`+`house_price`+`gpu_price`+`hdd_price`+`ssd_price`+`powersupply_price`+`cpucooler_price` WHERE `pc_id`=?;'
    db.query(sql2,[pc_id],(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }
        //return res.status(200).json({ message: 'Sikeresen hozzáadtad a processzort ' });
    })
    db.query(sql3,[pc_id],(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }
        //return res.status(200).json({ message: 'Sikeresen hozzáadtad a processzort ' });
    })
};

const deletePc_cpu = (req, res) => {
    const userid=req.user.id;
    const id=1000;
    const pc_id=userid+id;
    const sql="UPDATE `Yourbuild` SET cpu=0 WHERE pc_id=?";
    db.query(sql, [pc_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }
        console.log(pc_id);
        return res.status(200).json({ message: 'Sikeresen törölted a processzort ', result});
    });
    const sql2='UPDATE `Yourbuild_price` SET cpu_price=0 WHERE pc_id=?'
    db.query(sql2,[pc_id],(err,result)=>{
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben sql2' });
        }
    })
    const sql3='UPDATE `Yourbuild_price` SET `price`=`cpu_price`+`motherboard_price`+`house_price`+`gpu_price`+`hdd_price`+`ssd_price`+`powersupply_price`+`cpucooler_price` WHERE `pc_id`=?;'
    db.query(sql3,[pc_id],(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Hiba az SQL-ben sql3' });
        }
    })
};

const buildPc_board = (req, res) => {
    const userid=req.user.id;
    const mother_board=req.body;
    const id=1000;
    const pc_id=userid+id;
    const sql="UPDATE Yourbuild SET mother_board=? WHERE pc_id=? ;";
    db.query(sql, [mother_board.mother_board,pc_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben',err });
        }
        console.log(mother_board.mother_board,pc_id);
        return res.status(200).json({/* message: 'Sikeresen hozzáadtad a processzort '*/ result});
    });
    const sql2='UPDATE Yourbuild_price JOIN Yourbuild ON Yourbuild_price.pc_id = Yourbuild.pc_id JOIN products ON Yourbuild.mother_board = products.product_id SET Yourbuild_price.motherboard_price = products.price WHERE Yourbuild_price.pc_id = ?;';
    const sql3='UPDATE `Yourbuild_price` SET `price`=`cpu_price`+`motherboard_price`+`house_price`+`gpu_price`+`hdd_price`+`ssd_price`+`powersupply_price`+`cpucooler_price` WHERE `pc_id`=?;'
    db.query(sql2,[pc_id],(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Hiba az SQL-ben', err});
        }
        //return res.status(200).json({ message: 'Sikeresen hozzáadtad a processzort ' });
    })
    db.query(sql3,[pc_id],(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Hiba az SQL-ben', 
            err });
        }
        //return res.status(200).json({ message: 'Sikeresen hozzáadtad a processzort ' });
    })
};

const buildPc_house = (req, res) => {
    const userid=req.user.id;
    const house=req.body;
    const id=1000;
    const pc_id=userid+id;
    const sql="UPDATE Yourbuild SET house=? WHERE pc_id=? ;";
    db.query(sql, [house.house,pc_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben',err });
        }
        console.log(house.house,pc_id);
        return res.status(200).json({/* message: 'Sikeresen hozzáadtad a processzort '*/ result});
    });
    const sql2='UPDATE Yourbuild_price JOIN Yourbuild ON Yourbuild_price.pc_id = Yourbuild.pc_id JOIN products ON Yourbuild.house = products.product_id SET Yourbuild_price.house_price = products.price WHERE Yourbuild_price.pc_id = ?;';
    const sql3='UPDATE `Yourbuild_price` SET `price`=`cpu_price`+`motherboard_price`+`house_price`+`gpu_price`+`hdd_price`+`ssd_price`+`powersupply_price`+`cpucooler_price` WHERE `pc_id`=?;'
    db.query(sql2,[pc_id],(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Hiba az SQL-ben', err});
        }
        //return res.status(200).json({ message: 'Sikeresen hozzáadtad a processzort ' });
    })
    db.query(sql3,[pc_id],(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Hiba az SQL-ben', 
            err });
        }
        //return res.status(200).json({ message: 'Sikeresen hozzáadtad a processzort ' });
    })
};

const buildPc_gpu = (req, res) => {
    const userid=req.user.id;
    const gpu=req.body;
    const id=1000;
    const pc_id=userid+id;
    const sql="UPDATE Yourbuild SET gpu=? WHERE pc_id=? ;";
    db.query(sql, [gpu.gpu,pc_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben',err });
        }
        console.log(gpu.gpu,pc_id);
        return res.status(200).json({/* message: 'Sikeresen hozzáadtad a processzort '*/ result});
    });
    const sql2='UPDATE Yourbuild_price JOIN Yourbuild ON Yourbuild_price.pc_id = Yourbuild.pc_id JOIN products ON Yourbuild.gpu = products.product_id SET Yourbuild_price.gpu_price = products.price WHERE Yourbuild_price.pc_id = ?;';
    const sql3='UPDATE `Yourbuild_price` SET `price`=`cpu_price`+`motherboard_price`+`house_price`+`gpu_price`+`hdd_price`+`ssd_price`+`powersupply_price`+`cpucooler_price` WHERE `pc_id`=?;'
    db.query(sql2,[pc_id],(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Hiba az SQL-ben', err});
        }
        //return res.status(200).json({ message: 'Sikeresen hozzáadtad a processzort ' });
    })
    db.query(sql3,[pc_id],(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Hiba az SQL-ben', 
            err });
        }
        //return res.status(200).json({ message: 'Sikeresen hozzáadtad a processzort ' });
    })
};

const buildPc_hdd = (req, res) => {
    const userid=req.user.id;
    const hdd=req.body;
    const id=1000;
    const pc_id=userid+id;
    const sql="UPDATE Yourbuild SET hdd=? WHERE pc_id=? ;";
    db.query(sql, [hdd.hdd,pc_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben',err });
        }
        console.log(hdd.hdd,pc_id);
        return res.status(200).json({/* message: 'Sikeresen hozzáadtad a processzort '*/ result});
    });
    const sql2='UPDATE Yourbuild_price JOIN Yourbuild ON Yourbuild_price.pc_id = Yourbuild.pc_id JOIN products ON Yourbuild.hdd = products.product_id SET Yourbuild_price.hdd_price = products.price WHERE Yourbuild_price.pc_id = ?;';
    const sql3='UPDATE `Yourbuild_price` SET `price`=`cpu_price`+`motherboard_price`+`house_price`+`gpu_price`+`hdd_price`+`ssd_price`+`powersupply_price`+`cpucooler_price` WHERE `pc_id`=?;'
    db.query(sql2,[pc_id],(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Hiba az SQL-ben', err});
        }
        //return res.status(200).json({ message: 'Sikeresen hozzáadtad a processzort ' });
    })
    db.query(sql3,[pc_id],(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Hiba az SQL-ben', 
            err });
        }
        //return res.status(200).json({ message: 'Sikeresen hozzáadtad a processzort ' });
    })
};

const buildPc_ssd = (req, res) => {
    const userid=req.user.id;
    const ssd=req.body;
    const id=1000;
    const pc_id=userid+id;
    const sql="UPDATE Yourbuild SET ssd=? WHERE pc_id=? ;";
    db.query(sql, [ssd.ssd,pc_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben',err });
        }
        console.log(ssd.ssd,pc_id);
        return res.status(200).json({/* message: 'Sikeresen hozzáadtad a processzort '*/ result});
    });
    const sql2='UPDATE Yourbuild_price JOIN Yourbuild ON Yourbuild_price.pc_id = Yourbuild.pc_id JOIN products ON Yourbuild.ssd = products.product_id SET Yourbuild_price.ssd_price = products.price WHERE Yourbuild_price.pc_id = ?;';
    const sql3='UPDATE `Yourbuild_price` SET `price`=`cpu_price`+`motherboard_price`+`house_price`+`gpu_price`+`hdd_price`+`ssd_price`+`powersupply_price`+`cpucooler_price` WHERE `pc_id`=?;'
    db.query(sql2,[pc_id],(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Hiba az SQL-ben', err});
        }
        //return res.status(200).json({ message: 'Sikeresen hozzáadtad a processzort ' });
    })
    db.query(sql3,[pc_id],(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Hiba az SQL-ben', 
            err });
        }
        //return res.status(200).json({ message: 'Sikeresen hozzáadtad a processzort ' });
    })
};

const buildPc_supply = (req, res) => {
    const userid=req.user.id;
    const power_supply=req.body;
    const id=1000;
    const pc_id=userid+id;
    const sql="UPDATE Yourbuild SET power_supply=? WHERE pc_id=? ;";
    db.query(sql, [power_supply.power_supply,pc_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben',err });
        }
        console.log(power_supply.power_supply,pc_id);
        return res.status(200).json({/* message: 'Sikeresen hozzáadtad a processzort '*/ result});
    });
    const sql2='UPDATE Yourbuild_price JOIN Yourbuild ON Yourbuild_price.pc_id = Yourbuild.pc_id JOIN products ON Yourbuild.power_supply = products.product_id SET Yourbuild_price.powersupply_price = products.price WHERE Yourbuild_price.pc_id = ?;';
    const sql3='UPDATE `Yourbuild_price` SET `price`=`cpu_price`+`motherboard_price`+`house_price`+`gpu_price`+`hdd_price`+`ssd_price`+`powersupply_price`+`cpucooler_price` WHERE `pc_id`=?;'
    db.query(sql2,[pc_id],(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Hiba az SQL-ben', err});
        }
        //return res.status(200).json({ message: 'Sikeresen hozzáadtad a processzort ' });
    })
    db.query(sql3,[pc_id],(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Hiba az SQL-ben', 
            err });
        }
        //return res.status(200).json({ message: 'Sikeresen hozzáadtad a processzort ' });
    })
};

const buildPc_cooler = (req, res) => {
    const userid=req.user.id;
    const cpu_cooler=req.body;
    const id=1000;
    const pc_id=userid+id;
    const sql="UPDATE Yourbuild SET cpu_cooler=? WHERE pc_id=? ;";
    db.query(sql, [cpu_cooler.cpu_cooler,pc_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben',err });
        }
        console.log(cpu_cooler.cpu_cooler,pc_id);
        return res.status(200).json({/* message: 'Sikeresen hozzáadtad a processzort '*/ result});
    });
    const sql2='UPDATE Yourbuild_price JOIN Yourbuild ON Yourbuild_price.pc_id = Yourbuild.pc_id JOIN products ON Yourbuild.cpu_cooler = products.product_id SET Yourbuild_price.cpucooler_price = products.price WHERE Yourbuild_price.pc_id = ?;';
    const sql3='UPDATE `Yourbuild_price` SET `price`=`cpu_price`+`motherboard_price`+`house_price`+`gpu_price`+`hdd_price`+`ssd_price`+`powersupply_price`+`cpucooler_price` WHERE `pc_id`=?;'
    db.query(sql2,[pc_id],(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Hiba az SQL-ben', err});
        }
        //return res.status(200).json({ message: 'Sikeresen hozzáadtad a processzort ' });
    })
    db.query(sql3,[pc_id],(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Hiba az SQL-ben', 
            err });
        }
        //return res.status(200).json({ message: 'Sikeresen hozzáadtad a processzort ' });
    })
};

module.exports = {buildPc_cpu,buildPc_board,buildPc_house,buildPc_gpu,buildPc_hdd,buildPc_ssd,buildPc_supply,buildPc_cooler,deletePc_cpu};
