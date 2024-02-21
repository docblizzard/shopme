import { v4 as uuidv4 } from 'uuid';
import { pool } from '../plugins/db.js';
import { generateAccessToken } from '../plugins/token.js';

export const createUser = async (req, res) => {
    const user = req.body;
    const userWithId = { ...user, ID: uuidv4() };

    try {
        const results = await pool.query('INSERT INTO users (username, email, pwd, ID) VALUES ($1, $2, $3, $4) RETURNING *', 
            [userWithId.username, userWithId.email, userWithId.pwd, userWithId.ID]);

        const token = generateAccessToken( {username: userWithId.username});
        res.json(token)
        res.status(201).send(`User added with ID: ${results.rows[0].ID}`);
    
    } catch (error) {
        if (error.code === '23505' && error.constraint === 'users_username_key') {
            return res.status(400).json({ error: 'Username  already exists' });
        }
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUsers = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM users')
        return res.status(200).json(results.rows)
    
    }catch (error){
        return res.status(404).json({ error: 'Users not found' });
    }
}


export const getUserbyId = async (req, res) => {
    const { id } = await req.params;
    try {
        const results = await pool.query('SELECT * FROM users WHERE ID= $1', [id])
        res.status(200).json(results.rows)

    } catch (error){
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const updateUser = async (req, res) => {
    const { id } = await req.params;
    const  { username, email, pwd } = await req.body;
    try {
        const results = await pool.query('UPDATE users SET username = $1, email = $2, pwd = $3 WHERE ID = $4', 
        [username, email, pwd, id])
        res.status(200).send(`User modified with ID: ${id}`)

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const deleteUser = async (req, res) => {
    const { id } = await req.params;
    try {
        const results = pool.query('DELETE FROM users WHERE ID = $1', [id])
        response.status(200).send(`User deleted with ID: ${id}`)

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
