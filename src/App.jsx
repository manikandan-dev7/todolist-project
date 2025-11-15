import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import HomePage from './pages/HomePage'
import CreateTask from './pages/CreateTask'
import { useState } from 'react'

function App() {
  const initialTaskData = {
    Title: "",
    Description: "",
    Status: ""
  }

  const [TaskData, setTaskData] = useState(initialTaskData)
  const [TaskTableData, setTaskTableData] = useState([])
  const [EditIndex, setEditIndex] = useState(null)

  const handleTaskDataChange = (key, value) => {
    setTaskData({
      ...TaskData,
      [key]: value
    })
  }

  const handleCreate = (e, navigate) => {
    e.preventDefault();

    if (EditIndex === null) {
      setTaskTableData([...TaskTableData, TaskData])
    } else {
      TaskTableData[EditIndex] = TaskData
      setTaskTableData([...TaskTableData])
      setEditIndex(null)
    }

    setTaskData(initialTaskData)
    navigate("/home")  //navigate to home after saved
  }

  const handleEdit = (index, navigate) => {
    const clickedItem = TaskTableData[index]
    setTaskData(clickedItem);
    setEditIndex(index)
    navigate("/task")  // <-- go to edit page
  }

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      TaskTableData.splice(index, 1);
      setTaskTableData([...TaskTableData]);
    }
  }

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/home" element={
          <HomePage
            TaskTableData={TaskTableData}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        } />

        <Route path="/task" element={
          <CreateTask
            handleTaskDataChange={handleTaskDataChange}
            handleCreate={handleCreate}
            TaskData={TaskData}
            EditIndex={EditIndex}
            setTaskData={setTaskData}
            initialTaskData={initialTaskData}
            setEditIndex={setEditIndex}
          />
        } />

        <Route path="*" element={<Navigate to="/home" />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
