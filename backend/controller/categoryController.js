import pool from '../db.js';

export const createCategory = async(req, res) =>{

    try {
        const {name} = req.body;

        const reqRecord  = await pool.query("SELECT * FROM category WHERE name =$1 ",[name]);
        console.log(reqRecord.rows[0])
        if(reqRecord.rows[0]){
            res.status(500).send("category already exist")
        }
        else{
            const record =  await pool.query(" INSERT INTO category (name) VALUES($1) RETURNING *", [name]);
            res.status(200).send({
                success: true,
                msj : "category added successfully",
                category : record.rows[0]
            })
            console.log(record.rows[0])
        }  
    } catch (error) {
        console.log("something went wrong")
        res.status(500).send({
            "success" : false,
            "error" : error
        })
    }
   
 }  

 export const updateCategory = async(req,res) =>{
    
    try {
       const { name } = req.body;
       const { id } = req.params;
       const updatedCategoryResult = await pool.query(
         'UPDATE category SET name = $1 WHERE id = $2 RETURNING *',
         [name, id]
       );
    
       res.status(200).send({
         success: true,
         message: "Category Updated Successfully",
         category: updatedCategoryResult.rows[0],
       });

     }
      catch (error) {
       console.log(error);
       res.status(500).send({
         success: false,
         error,
         message: "Error while updating category",
       });
     }
 }

 export const showCategory = async(req,res) => {
    try {
    const record =await pool.query("SELECT * FROM category")
       res.status(200).send({
        success: true,
        data : record.rows
       }) 
    } catch (error) {
       res.status(500).send({
        success : false,
        error : error.error
       })
    }

 }

 export const showOneCategory = async(req,res) => {
  try {
    const {id} = req.params;

    const record = await pool.query("SELECT * FROM category WHERE id = $1" , [id])
    res.status(200).send({
        success : true,
        record : record.rows[0]
    })
  } catch (error) {
    res.status(500).send({
        error : error.message,
        success : false
    })
  }
 }
 
 export const deleteCategory = async(req, res) => {

  try {
    const {id} = req.params

    const record = await pool.query("DELETE FROM category WHERE id = $1 RETURNING *",[id])
    res.status(200).send({
        success : true,
        msj : "record deleted successfully",
        deletedRecord : record.rows[0]
    })
  } catch (error) {
    res.status(500).send({
        success : false,
        msj : "something went wrong"
    })
  }
 }