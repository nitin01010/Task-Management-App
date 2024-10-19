import React from 'react'
import TaskManage from '../components/taskManage'
import { Routes, Route } from "react-router-dom";
import TaskUpdate from '../components/taskUpdate';

const Home = () => {
  return (
    <>
      <h1 className=' text-center animate-fade-down animate-once  animate-ease-in font-bold text-2xl mt-10  capitalize'><b>Task Management App</b></h1>
      <Routes>
        <Route path="/" element={ <TaskManage /> } />
        <Route path="/todo/:id" element={ <TaskUpdate /> } />
      </Routes>
    </>
  )
}

export default Home