import express from 'express';
import { loginUser, registerUser } from '../controllers/auth.js';
import { invalidateToken } from '../plugins/token.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', invalidateToken)
export default router