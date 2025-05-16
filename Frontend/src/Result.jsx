import React from 'react'
import NavBar from './components/NavBar'
import ResultDashboard from './components/ResultDashboard'

function Result() {
  return (
   <>

    <div className='h-screen w-screen'>
    <div className='h-1/10 w-full'>
        <NavBar/>
   </div>
    <div className='h-9/10'>
        <ResultDashboard/>
   </div>
    </div>
   </>
  )
}

export default Result