require('../db')
const Student = require('../student_model')
const express = require('express')
const app = express.Router()

//Login router
app.post('/student/login', async(req, res)=> {
    try {
        const student = await Student.findOne({registration : req.body.registration})
        if(req.body.password === student.password) 
            res.send(student)
        else {
            res.status(400).send('Invalid Registration or password')
        }    
    }catch(e) {
        res.status(500).send('Invalid Registration or password')
    }
})

//Find all students or specific student
app.get('/student', async(req, res) => {
    try {
        const students = await Student.find(req.body)
        res.send(students)
    }catch(e) {
        res.status(500).send(e)
    }
})
//Create student
app.post('/student', async(req, res) => {
    const student = new Student(req.body)
    try{
        await student.save()
        res.send(student)
    }catch(e) {
        console.log(e)
        res.status(500).send(e)
    }
})
//Update student
app.patch('/student', async(req, res)=> {
    updatesNotAllowed = ['_id', 'registration']
    
    const student = await Student.findOne({registration : req.body.registration});
    let updates = Object.keys(req.body)
    const isAllowed = updates.filter((value)=> !updatesNotAllowed.includes(value))
    if (!isAllowed)
        return res.status(400).send({error : 'Invalid fields'})
    try {
        updates.forEach((update) => {student[update] = req.body[update]})
        await student.save();
        res.send(student)
    }catch(e) {
        console.log(e)
        res.status(400).send({error : 'Couldnt update student', message : e})
    }    
})

//Delete student
app.delete('/student', async (req, res) => {
    try {
        const removeStudent = await Student.findOne({registration : req.body.registration})
        await removeStudent.remove()
        res.send(removeStudent)
    }catch (e) {
        console.log(e)
        res.status(500).send()
    }
})
module.exports = app
