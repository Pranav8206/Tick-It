import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import { v4 as uuidv4 } from 'uuid';
import { IoTrashBin } from "react-icons/io5";

// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const [hideCompleted, sethideCompleted] = useState(true)


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const toggleCompleted = (e) => {
    sethideCompleted(!hideCompleted)
  }



  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    if (confirm("This task will be delete permanently!")){
    let newTodos = todos.filter(item => {
      return item.id != id
    })
    setTodos(newTodos)
    }
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }

  const deleteAll = (e) => {
    if (todos.length!==0){
      if (confirm("All the task will be delete!!")){
        let newTodos = []
        setTodos(newTodos)
      }
    }
  }


  return (
    <>


      <div className='background bg-gradient-to-t from-[#8d89ff] via-[#9da1ba] to-[#eeedf4] h-[100vh] text-black sm:flex'>
        <Navbar />
        <Sidebar />

        <div className="white-background bg-gray-200 flex items-center flex-col h-[92%] rounded-xl mx-4 sm:h-[95%] sm:mr-2 sm:w-[65%]  md:my-5 lg:mr-4">
          <div className="heading text-2xl py-2 font-bold">
            Just Tick It.</div>

          <div className='add-task flex justify-start px-2 relative'>
            <input onChange={handleChange} value={todo} className='h-10 pr-12 pl-2  sm:py-2 md:py-3 bg-[#c0c3da] text-black  placeholder:font-light placeholder:text-xm placeholder-[#969696] border-none rounded-full text-2xl' type="text"
              placeholder='Enter your task here!!' name='task' />

            <button onClick={handleAdd} disabled={todo.length <= 2} className='plusBTN disabled:opacity-30 text-2xl font-bold absolute right-5 top-[10px] '>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 8V16M16 12H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <div className='flex justify-evenly w-full my-2'>
            <div onClick={deleteAll} className='bg-gray-300 p-2 rounded-full font-medium flex items-center gap-2 cursor-pointer' title='remove all task'>
              <span><IoTrashBin /></span>
              Remove all
            </div>
            <div onClick={toggleCompleted} className='bg-gray-300 p-2 rounded-full font-medium flex items-center gap-2 cursor-pointer' title='remove all task'>
              <input  checked={hideCompleted} className='size-4 cursor-pointer' type="checkbox" name="" id="" />
              <div>Hide Completed Task</div>
            </div>


          </div>


          <div className='Todos-list lg:bg-gray-300 lg:h-[68vh] md:mx-10 px-2 lg:min-w-[97%] lg:my-5 rounded-xl overflow-x-auto '>
            {todos.length === 0 && <div className='my-10 font-light lg:font-bold lg:mx-[36%]'>No task to display!!</div>}
            {todos.map(item => {

              return (!hideCompleted || !item.isCompleted) && <div key={item.id} className="todo-single w-[85vw] h-auto sm:w-[59vw] mb-5 bg-[#c0c3da] rounded-full sm:rounded-3xl p-2 px-4 sm:px-8 md:m-2 my-2 flex justify-between items-center text-2xl font-medium">
                <div className='flex items-center gap-3 sm:gap-4  text-base font-bold md:text-lg lg:text-2xl break-words  whitespace-normal max-w-full overflow-x-auto'>
                  <input name={item.id} onChange={handleCheckbox} checked={item.isCompleted} className='size-5' type="checkbox" id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className='edit&deleteBTN flex gap-2 '>
                  <span onClick={(e) => handleEdit(e, item.id)} className='editBTN cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                    <path d="M8.17151 19.8284L19.8284 8.17157C20.3736 7.62632 20.6462 7.3537 20.792 7.0596C21.0693 6.50005 21.0693 5.8431 20.792 5.28354C20.6462 4.98945 20.3736 4.71682 19.8284 4.17157C19.2831 3.62632 19.0105 3.3537 18.7164 3.20796C18.1568 2.93068 17.4999 2.93068 16.9403 3.20796C16.6462 3.3537 16.3736 3.62632 15.8284 4.17157L4.17151 15.8284C3.59345 16.4064 3.30442 16.6955 3.15218 17.063C2.99994 17.4305 2.99994 17.8393 2.99994 18.6568V20.9999H5.34308C6.16059 20.9999 6.56934 20.9999 6.93688 20.8477C7.30442 20.6955 7.59345 20.4064 8.17151 19.8284Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12 21H18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M14.5 5.5L18.5 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  </span>

                  <span onClick={(e) => { handleDelete(e, item.id) }} className='deleteBTN cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                      <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                      <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                      <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                      <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                  </span>
                </div>
              </div>
            })}



          </div>
        </div>
      </div>


    </>
  )
}

export default App
