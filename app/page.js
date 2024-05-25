"use client"
import React, { useState } from 'react'

const Page = () => {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [error, setError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "" || desc.trim() === "") {
      setError("Both title and description are required.");
      return;
    }
    setMainTask([...mainTask, { title, desc }]);
    setTitle("");
    setDesc("");
    setError("");
    console.log(mainTask);
  };

  const deleteHandler = (index) => {
    let copyTask = [...mainTask];
    copyTask.splice(index, 1);
    setMainTask(copyTask);
  }

  let renderTask = <h2 className="text-center text-gray-500 text-xl mt-5">No Task Available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((task, index) => {
      return (
        <li key={index} className='list-none flex items-center justify-between bg-white p-4 rounded-lg shadow mb-4'>
          <div className='flex-1 pr-4'>
            <h5 className='text-xl font-semibold text-gray-800'>{task.title}</h5>
            <h6 className='text-lg text-gray-600'>{task.desc}</h6>
          </div>
          <button 
            onClick={() => { deleteHandler(index) }}
            className='bg-red-500 hover:bg-red-700 text-white py-2 px-4 font-bold rounded'>
            Delete
          </button>
        </li>
      );
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className='bg-black text-white p-5 text-4xl font-bold text-center w-full'>Amar's ToDo List</h1>

      <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow-md mt-10 w-full max-w-lg">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type='text'
          placeholder='Enter Task here'
          className='text-xl border border-gray-300 rounded-lg w-full px-4 py-2 mb-4'
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}
        />

        <input 
          type='text'
          placeholder='Enter Description here'
          className='text-xl border border-gray-300 rounded-lg w-full px-4 py-2 mb-4'
          value={desc}
          onChange={(e) => { setDesc(e.target.value) }}
        />

        <button className='bg-gray-700 hover:bg-gray-900 text-white py-2 px-4 font-bold rounded w-full'>
          Add Task
        </button>
      </form>

      <div className='mt-10 w-full max-w-lg'>
        {renderTask}
      </div>
    </div>
  )
}

export default Page
