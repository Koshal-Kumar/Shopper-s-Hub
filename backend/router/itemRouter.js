
import { Router } from "express";
import { addItem, deleteItem, showItem, showOneItem,updateItem ,productFilters ,productCount,searchFilters, braintreeTokenController,braintreePaymentController} from "../controller/itemController.js";
import { authorization } from "../middleware/authorization.js";
import authTokenMiddleware from "../middleware/authToken.js";
import braintree from "braintree";

const router = Router();

router.post('/add' ,authTokenMiddleware,authorization,addItem)
router.get('/show' ,showItem)
router.get('/show/:id' ,showOneItem)
router.delete('/delete/:id',authTokenMiddleware,authorization ,deleteItem)
router.put('/update/:id' ,authTokenMiddleware,authorization ,updateItem )
router.post('/product-filters' ,productFilters)
// router.get('/product-count', productCount)
router.get('/search/:keyword', searchFilters)
router.get('/braintree/token',braintreeTokenController) 
router.post('/braintree/payment',authTokenMiddleware , braintreePaymentController)
export default router;