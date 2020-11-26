const {model,Schema} = require('mongoose')

const contactSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true
    }
})

module.exports = model('Contact',contactSchema)