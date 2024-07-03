import { Router } from "express";
import authTokenMiddleware from "../middleware/authToken.js";
import { authorization } from "../middleware/authorization.js";
import { createCategory, showCategory, showOneCategory, updateCategory,deleteCategory } from "../controller/categoryController.js";

const router = Router();

router.get('/',showCategory)
router.get('/:id',showOneCategory)
router.post('/create-category', authTokenMiddleware , authorization ,createCategory)
router.put('/update-category/:id', authTokenMiddleware , authorization, updateCategory)
router.delete('/delete/:id', authTokenMiddleware,authorization,deleteCategory)
export default router;