const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        middleName: {
            type: String,
            required: false,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
    },
    password: {
        type: String,
        required: false,
        trim: true,
    },
    email: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    phone : {
        type : String,
        unique : true,
        required : true,
        trim : true
    },
    interests : [{
        type : String,
        trim : true
    }],
    registration : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    course : {
        type : String,
        trim : true,
        required : true
    },
    cgpa : {
        type : Number,
        trim : true,
        required : false
    },
    year : {
        type : Number,
        trim : true,
        required : false
    },
    skills : [{
        type : String,
        trim : true
    }]
})

//Getting public student details
studentSchema.methods.toJSON = function() {
    const student = this;
    return {
        name: {
            firstName : student.name.firstName,
            middleName : student.name.middleName,
            lastName: student.name.lastName
        },
        dateOfBirth: (student.dateOfBirth ? student.dateOfBirth.toLocaleDateString('en-US') : undefined),
        age : (student.dateOfBirth ? 
            (new Date(Date.now()).getFullYear() - student.dateOfBirth.getFullYear()) : undefined ),
        email: student.email,
        phone: student.phone,
        year: student.year,
        interests: student.interests,
        skills: student.skills,
        cgpa : student.cgpa,
        registration : student.registration,
        course : student.course,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt
    }
}

//Find student by registration and password combo
studentSchema.statics.findByCredentials = async (registration, password) => {
    const student = await students.findOne({ registration });
    if (!student) {
        throw new Error('Wrong username or password');
    } else {
        const isMatch = await bcrypt.compare(password, student.password);

        if (!isMatch) {
            throw new Error('Wrong username or password');
        }
        return student;
    }
};

//Create new student collection
const Student = mongoose.model('students', studentSchema)

module.exports = Student