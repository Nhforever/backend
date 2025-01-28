const db = require('../models/db');
function adminMiddleware(req, res, next) {
    // Felhasználó azonosítása, pl. session vagy JWT alapján
    const user = req.user.id;
    const sql="SELECT `admin` FROM `users` WHERE `user_id`=?;";
    db.query(sql,user,(err,result)=>{
        if(err){
            return res.status(500).json({message:"Adatbázis hiba"})
        }
        console.log(result[0].admin);
        const admin=result[0].admin;
        console.log(admin); 
        if (admin ==1) {
            return next(); // Ha admin, folytathatja a kérést
          } else {
            //console.log("Admin jog: "+admin);
            
            return res.status(403).json({ message: 'Access denied. Admins only.' });
          }
        //return res.status(201).json({message:"siker"});
       
    })
    // Ellenőrizzük, hogy a felhasználó admin-e
    
}
  
module.exports = adminMiddleware;