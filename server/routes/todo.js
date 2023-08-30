import express from 'express'
import { addTodo, deleteTodo, editTodoById, getTodoById, getTodos } from '../controllers/todoController.js'

const router = express.Router()



// @ /api/todo/create
router.post('/create', addTodo)

// @ /api/todo
router.get('/', getTodos)

// @ /api/todo/123
router.get('/:id', getTodoById)

// @ /api/todo/123
router.put('/:id', editTodoById)

// @ /api/todo/123
router.delete('/:id', deleteTodo)

export default router