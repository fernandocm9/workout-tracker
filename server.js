require("dotenv").config();
const express = require('express')
const pool =  require('./pg.js')
const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.static('client'))

app.get('/workouts', async (req,res)=>{
    try {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM workout')
        res.send(result.rows)
    } catch (err) {
        fiveHundredError(err,res)
    }
})

app.get('/workouts/:id', async(req,res)=>{
    try {
        const client = await pool.connect()
        const result = await client.query(`SELECT * FROM workoute WHERE id=${req.params.id}`)
        res.send(result.rows[0])
        client.release()
    } catch (err) {
        fiveHundredError(err,res)
    }
})

app.post('/workouts', async(req,res)=>{
    try {
        const obj = {
            text: 'INSERT INTO workout (the_day, type_workout, exercises, length_hour, length_min) VALUES ($1, $2, $3, $4, $5)',
            values: [req.body.date, req.body.type, req.body.exercise, req.body.hour, req.body.min]
        }
        const client = await pool.connect()
        const result = await client.query(obj)
        res.json({message: 'new workout was created'})
        client.release()
    } catch (err) {
        fiveHundredError(err, res)
    }
})

app.patch('/workout/:id', async(req, res)=>{
    try {
        const id = parseInt(req.params.id)
        const client = await pool.client()
        const {rows} = await client.query(`SELECT * FROM workout WHERE id=${id}`)
        const workout = rows[0]
        const obj = {
            date: req.body.date || workout.the_day,
            type: req.body.type || workout.type_workout,
            exercise: req.body.exercise || workout.exercises,
            hour: req.body.hour || workout.length_hour,
            min: req.body.min || workout.length_min
        }
        await pool.query('UPDATE workout SET the_day=$1, type_workout=$2, exercises=$3, length_hour=$4, length_min=$5', [obj.date, obj.type, obj.exercise, obj.hour, obj.min])
        res.send(workout)
    } catch (err) {
        fiveHundredError(err,res)
    }
})

app.delete('/workout/:id', async(req, res)=>{
    try {
        const client = await pool.client()
        const {rows} = await client.query(`SELECT * FROM workout WHERE id=${req.params.id}`)
        res.json({message: `workout ${req.params.id} was deleted`})
    } catch (err) {
        fiveHundredError(err, res)
    }
})

app.use((req,res)=>{
    res.status(404).json({message: '404 not found'})
})

function fiveHundredError(err, res){
    res.status(500)
    res.json(err)
}

app.listen(PORT, ()=>{
    console.log(`server running on port: ${PORT}`)
})