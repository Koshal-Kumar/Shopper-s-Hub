import pool from "../db.js";
import dotenv from 'dotenv';
import braintree from "braintree"
import redis from "redis"
import { createClient} from 'redis';
dotenv.config();


const client = createClient({
    password: 'rDIQdOSYKin5AGOP1lQCBhp1n5lD3oOz',
    socket: {
        host: 'redis-10391.c305.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 10391
    }
});



client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect();
client.on("connect" ,()=>console.log("client connected"))


const flushAllCache = async () => {
  try {
    if (!client.isOpen) {
      await client.connect();
    }
    const result = await client.flushAll();
    console.log(result); // Should log 'OK' if successful
  } catch (error) {
    console.error('Error flushing Redis cache:', error);
  }
};


var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,  
  merchantId: process.env.BRAINTREE_MERCHANT_ID,  
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


export const addItem = async (req, res) => {
  try {
    console.log("request came");
    const { name, price, description, image, quantity,category,discount} = req.body;

    const itemRec = await pool.query(
      "INSERT INTO items (name,price,description,image,quantity,category,discount) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [name, price, description, image, quantity,category,discount]
    );

    await flushAllCache();
    

    await flushAllCache();
    
    res.status(200).json({
      success: true,
      msj: "item added successfully",
      record: itemRec.rows[0],
    });
    console.log("item added");
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      msj: "something went wrong",
    });
  }
};

export const showItem = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = (page - 1) * limit;

    const cacheKey = `items_page_${page}_limit_${limit}`;
    const cachedData = await client.get(cacheKey);

    const totalCountResult = await pool.query("SELECT COUNT(*) FROM items");
    const totalItems = parseInt(totalCountResult.rows[0].count);
    
    if (!client.isOpen) {
      await client.connect();
    }
    if(cachedData && cachedData.length>0){
      console.log("cached DAta",cachedData)
      return res.status(200).json({
        success: true,
        msj: "Items retrieved successfully from cache",
        record: JSON.parse(cachedData),
        meta: {
          totalItems: totalItems,
          totalPages: Math.ceil(totalItems/ limit),
          currentPage: page,
          itemsPerPage: limit,
          },  
          })    
          }
          
    
    const data = await pool.query("SELECT * FROM items ORDER BY item_id ASC LIMIT $1 OFFSET $2",[limit,startIndex]);
   
   await client.set(cacheKey, JSON.stringify(data.rows),{
     EX :3600
   })
    res.status(200).json({
      success: true,
      msj: "item added successfully",
      record: data.rows,
      meta: {
        totalItems: totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
        itemsPerPage: limit,
      },
    });
    console.log(data.rows);
    console.log(data.meta);
   
  } catch (error) {
    res.status(400).json({
      success: false,
      msj: "something went wrong",
      error: error.message,
    });
    console.log(error);
  }
};

export const showOneItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await pool.query("SELECT * FROM items WHERE item_id = $1", [
      id,
    ]);
    res.status(200).json({
      success: true,
      msj: "required record",
      record: data.rows[0],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msj: "unable to getv record",
     
    });
    console.log(error);
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await pool.query(
      "DELETE FROM items WHERE item_id = $1 RETURNING *",
      [id]
    );

    await flushAllCache();


    await flushAllCache();

    res.status(200).json({
      success: true,
      msj: "record deleted successfully",
      record: data.rows[0],
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      msj: "unable to delete record",
      record: data.rows[0],
    });
    console.log(error);
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, quantity,category,discount} = req.body;

    const reqItem = await pool.query(
      "SELECT * FROM items WHERE item_id = $1",
      [id]
    );

    const updatedItem = {
      name: name || reqItem.name,
      description: description || reqItem.description,
      price: price || reqItem.price,
      image: image || reqItem.image,
      quantity: quantity || reqItem.quantity,
      category : category || reqItem.category,
      discount : discount || reqItem.discount
    };

    const data = await pool.query(
      "UPDATE items SET name = $1, description = $2, price = $3, image = $4, quantity = $5,category = $6,discount =$7 where item_id =$8 " ,
      [
        updatedItem.name,
        updatedItem.description,
        updatedItem.price,
        updatedItem.image,
        updatedItem.quantity,
        updatedItem.category,
        updatedItem.discount,
        idg
       
      ]
    );

    await flushAllCache();


    await flushAllCache();

    res.status(200).json({
      success: true,
      msj: "data updted sucessfully",
      record: data.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      msj: "unable to  update item",
    });
  }

};


export const productFilters = async(req,res)=>{
  try {
    const { checked, radio } = req.body;
    console.log(checked + radio + "checkandfradio");
 
    let query = 'SELECT * FROM items';
    let args = [];
 
  
    if (checked && checked.length > 0) {
      // Create a placeholder for each category ID
      const placeholders = checked.map((_, index) => `$${index + 1}`).join(', ');
      query += ` WHERE category IN (${placeholders})`;
      args.push(...checked);
    }
    // Add price range filter if radio array has exactly one value
    if (radio && radio.length === 2) {
      const a = args.length + 1;
      const b = args.length + 2;
      if (args.length === 0) {
        query += ' WHERE';
      } else {
        query += ' AND';
      }
      query += ` price >= $${a} AND price <= $${b}`;
      args.push(Number(radio[0]), Number(radio[1])); // Ensure price range values are numbers
    }
 
    console.log(query, args);
 
    const { rows } = await pool.query(query, args);
    console.log(rows, "result");
 
    res.status(200).send({
      success: true,
      products: rows,
    });
  } catch (error) {
    console.error('Error while filtering products:', error);
    res.status(400).send({
      success: false,
      message: 'Error while filtering products',
      error,
    });
  }
}

export const productCount = async (req, res) => {
  try {
    
  } catch (error) {
    res.status(400).send({
      success : false,
      error
    })
  }
}

export const searchFilters = async (req, res) => {
  try{
    const { keyword } = req.params;
    const query = "SELECT * FROM items WHERE name ILIKE $1 OR description ILIKE $1 OR category ILIKE $1";

    const values = [`%${keyword}%`]

    const   result = await pool.query(query, values)
    const data = result.rows;
    res.status(200).send({
      success : true,
      data : data
    })
  }catch(error) {
   res.status(400).send({
    error,
    success : false
   }) 
  }

}


export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const braintreePaymentController = async(req, res) =>{
try {
  const {cart, nonce} = req.body
  let total =0
  cart.map(( i) =>{total += i.price})
  
  gateway.transaction.sale(
    {
      amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
    },
    async function(error ,result){
      if(result){
        try {
          // Insert order into orders table within a single transaction
          const insertOrderQuery = `
            INSERT INTO orders (products, payment, buyer, status, created_at, updated_at)
            VALUES ($1, $2, $3, $4, NOW(), NOW())
            RETURNING id;
          `;

          const insertOrderValues = [
            JSON.stringify(cart), // Assuming cart contains all necessary product information
            JSON.stringify(result), // Assuming result contains payment details
            req.user.email, // Assuming req.user contains buyer email
            'Scheduled' // Default status
          ];

          await pool.query(insertOrderQuery, insertOrderValues);

          res.json({ ok: true });
      }
      catch(error) {
        console.error(error);
        res.status(500).send(error);
      }
    }
    else{
      res.status(500).send(error);
    }
    }
  );
  
} catch (error) {
  console.error(error);
  res.status(500).send(error);
}
}