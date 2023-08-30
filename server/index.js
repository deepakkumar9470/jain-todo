import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express();
import connectDB from './db/db.js'

const PORT = process.env.PORT || 8000
import cors from 'cors'
import todoRoute from './routes/todo.js'


app.use(express.json())
app.use(cors());

app.use('/api/todo', todoRoute);

connectDB()


app.listen(PORT, ()=>{
    console.log(`Server started at port http://localhost:${PORT}`)
});


