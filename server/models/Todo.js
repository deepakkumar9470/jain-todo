import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
    title  : {
        type: String,
         required: true
    },
    description  : {
        type: String,
        required: true
    },
    
},{timestamps : true})

const Todo = mongoose.model('Tdod', TodoSchema)
export default Todo;