import express from "express";
import { registerController, loginController, testController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController, forgotPasswordController } from '../controllers/authController.js';
import {  isAdmin, notAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object -  if you are doing routing in separate file 
const router = express.Router();


//ROUTING

//Register || Method POST
router.post('/register', registerController);

//Login || POST
router.post('/login', loginController);

//Forgot password || post
router.post("/forgot", forgotPasswordController);

//test
router.get("/test", requireSignIn, isAdmin, testController);

//Protected admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

//Protected user route auth
router.get('/user-auth', requireSignIn, notAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//get user orders
router.get("/orders", requireSignIn, getOrdersController);

//get all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//get all orders
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController);

export default router;


