import pool from "../db.js"

export const getAllItemsDB =async(limitlength ,startIndex ,keyword, filters) =>{

    try {
        const result = await pool.query(
            'SELECT * FROM public.getitemslist($1, $2, $3, $4)',
            [limitlength, startIndex, `%${keyword}%`, JSON.stringify(filters)]
          );
                  console.log(keyword ,"from allItemsDB")
        console.log(typeof(filters) ,"type chrek")
        console.log("filetr from DBO",filters)
        let rawJson = result.rows[0].getitemslist;
        return rawJson;
    } catch (error) {
        console.log("error.msj", error.message);
        console.log(error ,"error from the DboALlItems file")
    }
}