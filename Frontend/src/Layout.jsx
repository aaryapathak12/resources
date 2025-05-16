import React from 'react'
import NavBar from './components/NavBar'
import DisplayParagraph from './components/DisplayParagraph'
import { RiTimer2Fill } from "react-icons/ri";
import './App.css'


function Layout() {
  return (
    <>
    <NavBar/>
    <div>
        <div className='h-full flex items-center justify-center mt-10'>
        <div className='h-2/3 w-2/3'>
             <DisplayParagraph paragraph={"Make sure your compiled CSS is included in the <head> (your framework might handle this for you), then start using Tailwind’s utility classes to style your content."} />
        </div>
    </div>
    </div>
    </>
  )
}

export default Layout