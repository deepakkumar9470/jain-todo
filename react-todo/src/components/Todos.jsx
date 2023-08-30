import React,{useState, useEffect} from 'react'
import Preloader from './Preloader'
import axios from 'axios'
const Todos = () => {

    const [todo, setTodo] = useState({title : "", description : ""})
    const [todos, setTodos] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [currentId, setCurrentId] = useState(0)
    
    const resData = async () =>{
        try {
            const res = await axios.get('http://localhost:5000/api/todo')
        setTodos(res.data)
        } catch (error) {
            console.log(error)
        }
    }

     useEffect(()=>{
          let currentTodo = currentId!=0?todo.find(todo=>todo._id === currentId) : 
          {title : "", description : ""}
          setTodos(currentTodo)
     },[currentId]) 

    useEffect(() =>{
          resData();  
    },[]); 

 
   
   // Create todos (post) 
    const formSubmit = async (e) =>{
        e.preventDefault()
        try {
            const formdata =  {
                title,
                description 
            }
            const res = await axios.post('http://localhost:5000/api/todo/create',formdata)
            window.location.reload(true)
           setTitle("")
           setDescription("")
        } catch (error) {
            console.log(error)
        }
    };


    // edit todos
    const updateHandler = async (id) =>{
        const newtodo =  {
          title,
          description
        }
         const datares = await axios.put(`http://localhost:5000/api/todo/${id}`,newtodo)
         alert("Todo updated")
    };

     // delete todos
     const deleteHandler = async (id) =>{
        await axios.delete(`http://localhost:5000/api/todo/${id}`)
        const todosCopy  = [...todo];
        todosCopy.filter((item) => item._id !== id)
        setTodo(todosCopy)
        
    };


    return (
        <div className="flex flex-col text-white gap-10 items-center justify-center mt-10">
              <div className="flex flex-col gap-2 items-center justify-center">
                <h2>Todo App</h2>
                <img className="w-16 h-16" src="./todo.png" alt="todo" />
                <h3>Add Your Todo list here..</h3>
              </div>

            <div className="flex gap-5 items-center justify-center">
                
             <form className="flex gap-5 items-center justify-center" onSubmit={formSubmit}>

                    <div className="ml-2">
                    <label className="text-xl font-semibold mr-2" htmlFor="title">Title</label>
                    <input 
                        id="title" 
                        type="text" 
                        name="title"
                        className="text-base text-gray-500 rounded-md px-4 py-2  outline-none border-none" 
                        value={title}
                        required
                        placeholder="Title.."
                        onChange={(e)=>setTitle(e.target.value)}/>
                    </div>

                    <div className="ml-2">
                    <label className="text-xl font-semibold mr-2" htmlFor="description">Description</label>
                     <input 
                        id="description" 
                        type="text" 
                        name="description"
                        className="text-base text-gray-500 rounded-md px-4 py-2  outline-none border-none" 
                        value={description}
                        required
                        placeholder="Description"
                        onChange={(e)=>setDescription(e.target.value)}/>

                    </div>
                
                  <button 
                  
                    className=" bg-btn px-3 py-2 txet-white rounded-md" 
                    type="submit"><span className="text-2xl font-bold">+</span></button>
               
             </form>  
            </div>



         <div className="">
         {
                    !todos ? (<Preloader/>) : todos.length > 0 ?
                    ( <div className="w-[500px]">
                        {
                            todos.map((todo) => {
                                return (
                                    <div 
                                    className="mb-2"
                                    key={todo._id} 
                                   
                                    >
                                        <li 
                                          className="bg-indigo-600 text-white rounded-md px-2 hover:bg-indigo-700 transition-all  cursor-pointer"
                                          onClick={()=>updateHandler(todo._id)}
                                          >
                                            <div className="flex justify-between">
                                               <div className="flex flex-col gap-1 hover:text-gray-400 px-2 py-1">
                                               <h5 className="text-xl font-bold capitalize">{todo.title}</h5>
                                               
                                               <p className="text-sm font-semibold capitalize">{todo.description}</p>
                                               </div>
                                               <a
                                                href="!href"
                                                className="flexitem-center justify-center text-white text-xl cursor-pointer font-bold underline-none"
                                                onClick={()=>deleteHandler(todo._id)}>
                                              X</a>
                                               
                                            </div>
                                        </li>
                                      
                                      
                                    </div>
                                )
                            })
                        }
                       
                      </div>
                      
                      ) : (
                    <p>No todos found...</p>
                )
                }
         </div>

        </div>
    )
}

export default Todos