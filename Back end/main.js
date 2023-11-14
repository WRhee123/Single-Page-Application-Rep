const express = require('express');
const app = express()
const { Pool } = require('pg');
const cors = require('cors')
const pool = new Pool ({
    host: 'localhost',
    user: 'postgres',
    database: 'foodinfo',
    password: '1',
    port: '5432'
})
app.use(cors())
app.use(express.json())
app.use(express.static('public'))


app.get('/api/restaurants', async(req, res) => {
    try {
        let result = await pool.query('SELECT * FROM restaurants');
        res.send(result.rows)
    } catch(error) {
        console.log(error.stack);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

app.get('/api/restaurants/:id', async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        if(isNaN(id) || id < 0) {
            return res.status(400).json({error: 'Invalid ID'})
        } else {
            let result = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);
            if(result.rows.length === 0) {
                res.status(400).json({error: 'Not Found'})
            }
            res.status(200).send(result.rows[0])
        }
    }catch(error) {
        console.log(error.stack);
        res.status(500).json({error:'Internal Server Error'})
    }
})

app.post('/api/restaurants', async(req, res) => {
    try{
        const {name, phone_number, rating} = req.body;
        let result = await pool.query(
            'INSERT INTO restaurants (name, phone_number, rating) VALUES ($1, $2, $3) RETURNING *', [name, phone_number, rating]
            );
        res.send(result.rows[0])
    } catch(error) {
        console.log(error.stack);
        res.status(500).json({error: "Internal Server Error"})
    }
})

app.put('/api/restaurants/:id', async(req, res) => {
    try{ 
        const id = parseInt(req.params.id);
    const {name, phone_number, rating} = req.body;
    const result = await pool.query(
        'UPDATE restaurants SET name = $1, phone_number = $2, rating = $3 WHERE id = $4 RETURNING *', [name, phone_number, rating, id]
        );
        console.log(result.rows)
    if(result.rows.length === 0) {
        return res.status(400).send('Restaurant not found')
    }
    res.json(result.rows[0]);
    }catch(error) {
        console.log(error.stack);
        res.status(500).json({error: "Internal Server Error"})
    }
})

app.delete('/api/restaurants/:id', async(req, res) => {
    try{ 
        let id = parseInt(req.params.id);
        let result = await pool.query('DELETE FROM restaurants WHERE id = $1 RETURNING *', [id]);
        res.status(200).send(result.rows[0])
    }catch(error) {
        console.log(error.stack);
        res.status(500).json({error: "Internal Server Error"})
    }
})






app.get('/api/items', async(req, res) => {
    try {
        let result = await pool.query('SELECT * FROM items');
        res.send(result.rows)
    } catch(error) {
        console.log(error.stack);
        res.status(500).json({error: 'Internal Server Error'})
    }
})


app.get('/api/items/:id', async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        if(isNaN(id) || id < 0) {
            return res.status(400).json({error: 'Invalid ID'})
        } else {
            let result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
            if(result.rows.length === 0) {
                res.status(400).json({error: 'Not Found'})
            }
            res.status(200).send(result.rows[0])
        }
    }catch(error) {
        console.log(error.stack);
        res.status(500).json({error:'Internal Server Error'})
    }
})

app.post('/api/items', async(req, res) => {
    try{
        const {restaurants_id, food_name, vegan, spice_level, calories} = req.body;
        let result = await pool.query(
            'INSERT INTO items (restaurants_id, food_name, vegan, spice_level, calories) VALUES ($1, $2, $3, $4, $5) RETURNING *', [restaurants_id, food_name, vegan, spice_level, calories]
            );
        res.send(result.rows[0])
    } catch(error) {
        console.log(error.stack);
        res.status(500).json({error: "Internal Server Error"})
    }
})

app.put('/api/items/:id', async(req, res) => {
    try{ 
        const id = parseInt(req.params.id);
    const {restaurants_id, food_name, vegan, spice_level, calories} = req.body;
    const result = await pool.query(
        'UPDATE items SET restaurants_id = $1, food_name = $2, vegan = $3, spice_level = $4, calories = $5 WHERE id = $6 RETURNING *', [restaurants_id, food_name, vegan, spice_level, calories, id]
        );
        console.log(result.rows)
    if(result.rows.length === 0) {
        return res.status(400).send('Restaurant not found')
    }
    res.json(result.rows[0]);
    }catch(error) {
        console.log(error.stack);
        res.status(500).json({error: "Internal Server Error"})
    }
})

app.delete('/api/items/:id', async(req, res) => {
    try{ 
        let id = parseInt(req.params.id);
        let result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
        res.status(200).send(result.rows[0])
    }catch(error) {
        console.log(error.stack);
        res.status(500).json({error: "Internal Server Error"})
    }
})


const PORT = 3000;
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})