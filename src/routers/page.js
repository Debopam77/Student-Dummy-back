const express = require('express')
const app = express.Router()

const aboutUs = 'Hi I am Debopam! I hope you like this app..'
app.get('/aboutUs', async(req, res) => {
    try{
        res.send(aboutUs)
    }catch(e) {
        res.send(500).send(e)
    }
})


module.exports = app