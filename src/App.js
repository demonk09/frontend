import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Examst from './components/Examst'
import Assesnment from './components/Assesnment'
import Res from './components/Res'
import Gc from './components/Gc'

function App() {

  let [data,setData]=useState({})
  let fun=(data)=>{
    setData(data)
  }
  let obj={"data":data,"fun":fun}

  return (
   <BrowserRouter>
   <Gc.Provider value={obj}>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/reg' element={<Register/>}/>
      <Route path='/landingpage' element={<Examst/>}/>
      <Route path='/exam' element={<Assesnment/>}/>
      <Route path='/res' element={<Res/>}/>
    </Routes>

   </Gc.Provider>
   </BrowserRouter>
  )
}

export default App