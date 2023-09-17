import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryConteroller, updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router();

//Routes

//Create
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

// update
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

//get-all category
router.get('/get-category', categoryController);

//single category
router.get('/single-category/:slug', singleCategoryConteroller);

//delete Category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

export default router;