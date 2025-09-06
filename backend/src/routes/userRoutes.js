
import express from 'express';
import { loginUser, registerUser, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getAllUsers);

// Login route
router.post('/login', loginUser);

// Register route
router.post('/register', registerUser);


export default router;

