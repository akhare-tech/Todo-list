import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import { v4 as uuidv4 } from "uuid"

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("todos")
    if (saved) {
      setTodos(JSON.parse(saved))
    }
  }, [])

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  // Toggle Show Finished
  const toggleShowFinished = () => {
    setShowFinished(prev => !prev)
  }
  // Delete Todo
  const handleDelete = (id) => {
    setTodos(prev => prev.filter(item => item.id !== id))
  }
  //  Edit Todo
  const handleEdit = (id) => {
    const itemToEdit = todos.find(item => item.id === id)
    if (!itemToEdit) return

    setTodo(itemToEdit.todo)
    setTodos(prev => prev.filter(item => item.id !== id))
  }
  // Add Todo
  const handleAdd = () => {
    if (todo.trim().length <= 3) return

    const newTodo = {
      id: uuidv4(),
      todo: todo,
      isCompleted: false,
    }
    // Add new todo to the list
    setTodos(prev => [...prev, newTodo])
    setTodo("")
  }
  // Handle Checkbox Toggle
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  // Handle Checkbox Toggle
  const handleCheckbox = (e) => {
    const id = e.target.name

    setTodos(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      )
    )
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-violet-200 via-purple-300 to-indigo-300 py-10">

        <div className="container mx-auto w-1/2 bg-white/40 backdrop-blur-xl rounded-3xl p-8 min-h-[80vh] shadow-[0_20px_60px_rgba(0,0,0,0.25)]
          hover:shadow-[0_25px_80px_rgba(139,92,246,0.4)]transition-all duration-500 border border-white/30">
          <h1 className="font-bold text-center text-2xl mb-6">
            iTask - Manage your todos at one place
          </h1>
          {/* Add Todo */}
          <div className="flex flex-col gap-4 mb-6">
            <h2 className="text-lg font-bold">Add a Todo</h2>
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Enter a todo"
              className="input w-full rounded-xl py-2 shadow-md"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-gradient-to-r from-purple-600 to-violet-700 hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300
              disabled:opacity-60 text-white px-4 py-3 rounded-2xl"
            >
              Submit
            </button>
          </div>
          {/* Toggle */}
          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={showFinished}
              onChange={toggleShowFinished}
              className="checkbox checkbox-primary shadow-md"
            />
            <span>Show Finished</span>
          </div>
          <h2 className="text-xl font-bold mb-4">Your Todos</h2>
          {/* Todo List */}
          <div>
            {todos.length === 0 && (
              <div className="text-center text-gray-600">
                No todos yet
              </div>
            )}

            {todos.map(item => (
              (showFinished || !item.isCompleted) && (

                <div
                  key={item.id}
                  className="flex justify-between items-center bg-white/70 backdrop-blur-md p-4 rounded-2xl my-4 shadow-md hover:shadow-2xl
                  hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      name={item.id}
                      checked={item.isCompleted}
                      onChange={handleCheckbox}
                      className="checkbox checkbox-primary shadow"
                    />

                    <div
                      className={`text-lg ${item.isCompleted ? "line-through text-gray-500" : ""
                        }`}
                    >
                      {item.todo}
                    </div>
                  </div>

                  {/* ICON BUTTONS */}
                  <div className="flex gap-3">

                    {/* EDIT */}
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="w-10 h-10 flex items-center justify-center
                      bg-gradient-to-br from-purple-600 to-purple-700
                      hover:scale-110 hover:shadow-lg
                      active:scale-95 transition-all duration-200
                      text-white rounded-xl"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="w-10 h-10 flex items-center justify-center
                      bg-gradient-to-br from-red-500 to-red-600
                      hover:scale-110 hover:shadow-lg
                      active:scale-95 transition-all duration-200
                      text-white rounded-xl"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>

                  </div>

                </div>
              )
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default App
