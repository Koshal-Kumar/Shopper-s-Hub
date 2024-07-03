import { Router } from "express";
import { signup,login, getOrderController, getAllOrders } from '../controller/userController.js';
import authTokenMiddleware from "../middleware/authToken.js";
import { authorization } from "../middleware/authorization.js";

const router = Router();
router.post('/signup',signup)
router.post("/login",login)

router.get('/user-auth', authTokenMiddleware , (req, res) => {
    res.status(200).send({ok : true});
})
router.get('/admin-auth', authTokenMiddleware ,authorization, (req, res) => {
    res.status(200).send({ok : true});
})
router.get('/get-orders/:currentUser' ,authTokenMiddleware , getOrderController)
router.get('/all-orders',authTokenMiddleware,authorization,getAllOrders)
export default router;
