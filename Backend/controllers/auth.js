import { v4 as uuidv4 } from 'uuid';
import { pool } from '../plugins/db.js';
import bcrypt from 'bcrypt';
import { generateAccessToken } from '../plugins/token.js';

export const registerUser = async (req, res) => {
    try {
        const users = (await pool.query('SELECT * FROM users')).rows
        console.log(users)

        const { username, email, pwd } = req.body;

        if (users.some(user => user.username === username)) {
          return res.status(400).json({ error: 'Username is already taken' });
        }
        if (users.some(user => user.email === email)) {
          return res.status(400).json({ error: 'Email is already taken' });
        }
        
        const hashedPassword = await bcrypt.hash(pwd, 10);
        const newUser = { username, email, pwd: hashedPassword, ID: uuidv4() };
        console.log(newUser.pwd)
        const results = await pool.query('INSERT INTO users (username, email, pwd, ID) VALUES ($1, $2, $3, $4) RETURNING *', 
        [newUser.username, newUser.email, newUser.pwd, newUser.ID]);

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const loginUser = async (req, res) => {
    try {
        const users = (await pool.query('SELECT * FROM users')).rows
        const { username, pwd } = req.body;
        const user = users.find(u => u.username === username);
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      const passwordMatch = await bcrypt.compare(pwd, user.pwd);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      const token = generateAccessToken({username: user.username});
      console.log("this is the token:" + token)
      res.status(200).json(token);

    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
  