import { getAllItemsDB } from "../DBO/allItems.db.js";

export const getAllItems=async( limit , startIndex,keyword,filters)=>{
    try {
        console.log(typeof(filters) ,"type cek")
        const result = await getAllItemsDB(limit, startIndex,keyword,filters)
        return result;
    } catch (error) {
        console.log(error , "error from itemsDboService file")
    }
}