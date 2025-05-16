import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Layout from './Layout'
import Result from './Result'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}/>
        <Route path='/result/:nWords/:Chars/:nChars/:nTime' element={<Result/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App