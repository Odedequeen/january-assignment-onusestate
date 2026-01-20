import { useState } from 'react'
import './App.css'
import Select from "./component/Select";
import LandingPage from './landingPage/landingPage';




function App() {


  return (
    <>
    
      <h1>JANUARY ASSIGNMENT ON HOOKS</h1>
      <div className="App">
      <LandingPage/>
      <Select/>
      
      </div>
    </>
  )
}

export default App;
