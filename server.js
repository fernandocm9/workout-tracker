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
        const result = await client.query(`SELECT * FROM workout WHERE id=${req.params.id}`)
        res.send(result.rows[0])
        client.release()
    } catch (err) {
        fiveHundredError(err,res)
    }
})

app.post('/workouts', async(req,res)=>{
    try {
        const obj = {
            text: 'INSERT INTO workout (the_day, type_workout, exercise, sets, reps) VALUES ($1, $2, $3, $4, $5)',
            values: [req.body.the_day, req.body.type_workout, req.body.exercise, req.body.sets, req.body.reps]
        }
        const client = await pool.connect()
        const result = await client.query(obj)
        res.json({message: 'new workout was created'})
        client.release()
    } catch (err) {
        fiveHundredError(err, res)
    }
})

app.patch('/workouts/:id', async(req, res)=>{
    try {
        const id = parseInt(req.params.id)
        const client = await pool.client()
        const {rows} = await client.query(`SELECT * FROM workout WHERE id=${id}`)
        const workout = rows[0]
        const obj = {
            date: req.body.the_day || workout.the_day,
            type: req.body.type_workout || workout.type_workout,
            exercise: req.body.exercise || workout.exercise,
            hour: req.body.sets || workout.sets,
            min: req.body.reps || workout.reps
        }
        const changed = await pool.query('UPDATE workout SET the_day=$1, type_workout=$2, exercise=$3, sets=$4, reps=$5', [obj.date, obj.type, obj.exercise, obj.hour, obj.min])
        res.json({message: 'workout was updated'})
        client.release()
    } catch (err) {
        fiveHundredError(err,res)
    }
})

app.delete('/workouts/:id', async(req, res)=>{
    try {
        const client = await pool.client()
        const {rows} = await client.query(`SELECT * FROM workout WHERE id=$1`, [req.params.id])
        if(!rows[0]){
            return res.status(404).json({message: 'entry already does not exist'})
        }
        await client.query(`DELETE FROM workout WHERE id=$1`, [req.params.id])
        res.json({message: `workout ${req.params.id} was deleted`})
        client.release()
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