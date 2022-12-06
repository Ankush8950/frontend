import React from 'react'
import UserForm from './components/UserForm'
import ListUser from './components/ListUser'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div className='flex flex-col'>
      <UserForm />
      <Routes>
      <Route path='/ListUser' element={<ListUser />}/>
      </Routes>
    </div>
  )
}

export default App
