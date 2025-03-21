const db = require('../models/db');

const buildPc_cpu = (req, res) => {
    const userid=req.user.id;
    const cpu=req.body;
    const id=1000;
    const pc_id=userid+id;
    const sql="UPDATE Yourbuild SET cpu=? WHERE pc_id=? ;";
    db.query(sql, [cpu,pc_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }
        console.log(cpu.cpu,pc_id);
        return res.status(200).json({/* message: 'Sikeresen hozzáadtad a processzort '*/ result});
    });
    const sql2='UPDATE Yourbuild_price JOIN Yourbuild ON Yourbuild_price.pc_id = Yourbuild.pc_id JOIN products ON Yourbuild.cpu = products.product_id SET Yourbuild_price.cpu_price = products.price WHERE Yourbuild_price.pc_id = ?;';
    const sql3='UPDATE `Yourbuild_price` SET `price`=`cpu_price`+`mother-board_price`+`house_price`+`gpu_price`+`hdd_price`+`ssd_price`+`power-supply_price`+`cpu-cooler_price` WHERE `pc_id`=?;'
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

const buildPc_board = (req, res) => {
    const userid=req.user.id;
    const board=req.body;
    const id=1000;
    const pc_id=userid+id;
    const sql="INSERT INTO Yourbuild (pc_id, mother_board,cat_id) VALUES (?,?,103) ON DUPLICATE KEY UPDATE mother_board = VALUES(mother_board);";
    db.query(sql, [pc_id,board], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }
        return res.status(200).json({ message: 'Sikeresen hozzáadtad az alaplapot ' });
    });
};

const buildPc_house = (req, res) => {
    const userid=req.user.id;
    const house=req.body;
    const id=1000;
    const pc_id=userid+id;
    const sql="INSERT INTO Yourbuild (pc_id, house,cat_id) VALUES (?,?,103) ON DUPLICATE KEY UPDATE house = VALUES(house);";
    db.query(sql, [pc_id,house], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }
        return res.status(200).json({ message: 'Sikeresen hozzáadtad a gépházat ' });
    });
};

const buildPc_gpu = (req, res) => {
    const userid=req.user.id;
    const gpu=req.body;
    const id=1000;
    const pc_id=userid+id;
    const sql="INSERT INTO Yourbuild (pc_id, gpu,cat_id) VALUES (?,?,103) ON DUPLICATE KEY UPDATE gpu = VALUES(gpu);";
    db.query(sql, [pc_id,gpu], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }
        return res.status(200).json({ message: 'Sikeresen hozzáadtad a videókártyát ' });
    });
};

const buildPc_hdd = (req, res) => {
    const userid=req.user.id;
    const hdd=req.body;
    const id=1000;
    const pc_id=userid+id;
    const sql="INSERT INTO Yourbuild (pc_id, hdd,cat_id) VALUES (?,?,103) ON DUPLICATE KEY UPDATE hdd = VALUES(hdd);";
    db.query(sql, [pc_id,hdd], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }
        return res.status(200).json({ message: 'Sikeresen hozzáadtad a hdd-t ' });
    });
};

const buildPc_ssd = (req, res) => {
    const userid=req.user.id;
    const ssd=req.body;
    const id=1000;
    const pc_id=userid+id;
    const sql="INSERT INTO Yourbuild (pc_id, ssd,cat_id) VALUES (?,?,103) ON DUPLICATE KEY UPDATE ssd = VALUES(ssd);- ";
    db.query(sql, [pc_id,ssd], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }
        return res.status(200).json({ message: 'Sikeresen hozzáadtad az ssd-t ' });
    });
};

const buildPc_supply = (req, res) => {
    const userid=req.user.id;
    const supply=req.body;
    const id=1000;
    const pc_id=userid+id;
    const sql="INSERT INTO Yourbuild (pc_id, power_supply,cat_id) VALUES (?,?,103) ON DUPLICATE KEY UPDATE power_supply = VALUES(power_supply);";
    db.query(sql, [pc_id,supply], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }
        return res.status(200).json({ message: 'Sikeresen hozzáadtad a tápegységet ' });
    });
};

const buildPc_cooler = (req, res) => {
    const userid=req.user.id;
    const cooler=req.body;
    const id=1000;
    const pc_id=userid+id;
    const sql="INSERT INTO Yourbuild (pc_id, cooler,cat_id) VALUES (?,?,103) ON DUPLICATE KEY UPDATE cooler = VALUES(cooler);";
    db.query(sql, [pc_id,cooler], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az SQL-ben' });
        }
        return res.status(200).json({ message: 'Sikeresen hozzáadtad a processzorhűtőt ' });
    });
};

module.exports = {buildPc_cpu,buildPc_board,buildPc_house,buildPc_gpu,buildPc_hdd,buildPc_ssd,buildPc_supply,buildPc_cooler};
