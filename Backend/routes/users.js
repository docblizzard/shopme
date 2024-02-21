import express from 'express';
import { createUser, deleteUser, getUserbyId, getUsers, updateUser } from '../controllers/users.js';
import { authenticateToken } from '../plugins/token.js';
const router = express.Router();


router.get('/',authenticateToken, getUsers);

router.post('/', createUser);

router.get('/:id', getUserbyId);

router.patch('/:id', updateUser)

router.delete('/:id', deleteUser);

export default router;