
import Todo from '../models/Todo.js'

export const addTodo = async (req, res) => {

    try{
        const newTodo = new Todo({
            title : req.body.title,
            description : req.body.description,
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error){
        res.status(404).json({ message: error.message});     
    }
}

export const getTodos = async (req, res) => {
    try{
       
        const todos = await Todo.find().sort({_id : -1});
        res.status(200).json(todos);
    }catch( error ){
        res.status(404).json({ message: error.message })
    }
}


export const getTodoById = async (req, res) => {
    try{
        const todo = await Todo.findById(req.params.id);
        res.status(200).json(todo);
    }catch( error ){
        res.status(404).json({ message: error.message })
    }
}


export const editTodoById = async (req, res) => {
    try{
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, 
            {new:  true});
        res.status(200).json({msg : 'Todo has been updated..',data: todo});
    }catch( error ){
        res.status(404).json({ message: error.message })
    }
}


export const deleteTodo = async (req, res) => {
    try{
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({msg : 'Todo has been deleted..'});
    }catch( error ){
        res.status(404).json({ message: error.message })
    }
}



