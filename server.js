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