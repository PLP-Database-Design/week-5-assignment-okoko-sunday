const express = require("express");
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');


dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


db.connect((err) => {
    if(err){
        return console.log('Error connecting to the databse: ', err)
    }
    console.log('Successfully connected to Mysql: ', db.threadId)

})

// Question 1
app.get('', (req, res)=>{
    const getPatients= 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(getPatients,(err, data) =>{
        if(err){
            return res.status(400).send('Failed to get patients', err)
        }
        res.status(200).send(data)
    })
})

// Question 2
app.get('', (req, res)=>{
    const getProviders= 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(getProviders,(err, data) =>{
        if(err){
            return res.status(400).send('Failed to get providers', err)
        }
        res.status(200).send(data)
    })
})

// Question 3
app.get('', (req, res)=>{
    const getPatients= 'SELECT first_name  FROM patients';
    db.query(getPatients,(err, data) =>{
        if(err){
            return res.status(400).send('Failed to get patients', err)
        }
        res.status(200).send(data)
    })
})

// Question 4
app.get('', (req, res)=>{
    const getProviders= 'SELECT *  FROM providers ORDER BY provider_specialty';
    db.query(getProviders,(err, data) =>{
        if(err){
            return res.status(400).send('Failed to get providers', err)
        }
        res.status(200).send(data)
    })
})


// start and listen to the server
app.listen(3300, () => {
    console.log(`server is running on port 3300...`)
})