import pool from '../db.js';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY ;

export const signup = async(req, res)=>{
    try {
        const {name,email,password,phone,address,role} = req.body;
        const salt= await bcrypt.genSalt(10);
        const value=await bcrypt.hash(password, salt);  
        if(!name){
           return res.send("name is required");
        }
        if(!email){
            return res.send("email is required");
        }
        if(!password){
            return res.send("password is required");
        }
        if(!phone){
            return res.send("phone number is required");
        }
        if(!address){
            return res.send("address is required");
        }
        if(!role){
            return res.send("role is required");
        }
        
        const existingUser = await pool.query("SELECT * FROM users WHERE email= $1",[email])
        // console.log(existingUser.rows[0])
        if(existingUser.rows.length > 0 ){
            return res.send({
                "success": false,
                "msj":"This email already exist, try another "})
        }else{



        const userRecord = await pool.query(
            "INSERT INTO users (name,email,password,phone,address,role) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
            [name,email,value,phone,address,role]
        );


        res.status(200).json({
           "success" : true,
           "msj" :"user added successfully",
           "userData" :userRecord.rows[0]});
        console.log('user added')
    }
}
     catch (error) {
        console.log(error)
        res.status(500).json({ 
            "success ": false,
           "msj": 'Internal Server Error' });

    }
 
}


export const login = async (req, res) => {
    try{
        const {name,email,password,role} = req.body;

        if(!name ){
            return res.send("name is required");
        }
        if(!email ){
            return res.send("email is required");
        }
        if(!password ){
            return res.send("password is required");
        }
        if(!role ){
            return res.send("role is required");
        }
        const reqRecord = await pool.query("SELECT * FROM users WHERE email = $1",[email])
       
        console.log("south super star sujal bhai",reqRecord.rows[0])
        if(reqRecord.rows.length === 0){
            console.log("no such user exist")
            return res.status(400).json({
                "success" : false,
                "msj" : "no such user exist"})
        }

        const value = await bcrypt.compare(password,reqRecord.rows[0].password)
        if(!value){
            return res.status(400).json({
                "success":false,
                "msj":"password mismatch"})
        }
        
        const token = jwt.sign({email,password,role},secretKey)
        res.json({
            "userData":reqRecord.rows[0],
            "success":true,
            "token":token, 
            "msj": `welcome ${name}`})
    }
    catch(err) {
        res.json({
            "success":false,
            "msj": "something went wrong"
        })
    }
}


export const getOrderController = async (req, res) => {

    try {
        const ordersQuery = `
        SELECT o.id, o.products, o.payment, u.name AS buyer_name, o.status, o.created_at
        FROM orders o
        LEFT JOIN users u ON o.buyer = u.email
        ORDER BY o.created_at DESC;
      `;
   
      const { rows } = await pool.query(ordersQuery);
   
      res.status(200).send({
        success: true,
        data: rows
      })
    } catch (error) {
     res.status(500).send({
        success : false,
        error
     })   
    }
}