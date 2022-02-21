const connectURL = 'mongodb://127.0.0.1:27017/student-info'
const mongoose = require('mongoose');
console.log(connectURL);
mongoose.connect(connectURL);