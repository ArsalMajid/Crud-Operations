import express from 'express';

// Use the absolute path logic relative to the current file
import * as userController from '../controllers/userController.js';

const router = express.Router();

// Reference the functions from the controller object
router.get('/', userController.getUsers);
router.post('/', userController.createUser);

export default router;