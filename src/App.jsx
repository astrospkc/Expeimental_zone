import { useState } from 'react'
import './App.css'
import VoiceInput from './components/VoiceInput'
import { Bear } from './components/Bear'
import Game from './components/Game'

function App() {

  return (
    <>
      <div className='w-full flex justify-center items-center h-screen'>
        <span>voice to text- implementation</span>
        <span><VoiceInput /></span>
        <span><Bear /></span>
        <span><Game /></span>
      </div>
    </>
  )
}

export default App
