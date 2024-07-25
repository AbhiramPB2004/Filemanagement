import React from 'react'
import '../App.css';
import { redirect } from 'react-router-dom';
function Main() {
  return (
    <div className="App flex flex-col">
      <h1 className='text-5xl text-center font-sans font-bold'>File managment</h1>
      <div className='p-5'>
        <a href='http://localhost:3000/fileupload'>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >
        Upload file 
      </button>
      </a>
      </div>
    <div className=' a'>
    <div className='grid grid-cols-4 grid-rows-4  auto-cols-max  gap-0'>
    <div className='h-56 w-96 shadow-lg bg-slate-500 flex self-center items-center justify-center'>
      <div className='align'>
        asde
      </div>
    </div>
    <div className='h-56 w-96 bg-slate-500'>
      ask.jdlwj
    </div>
    <div className='h-56 w-96 bg-slate-500'>
      ask.jdlwj
    </div>
    <div className='h-56 w-96 bg-slate-500'>
      ask.jdlwj
    </div>
    <div className='h-56 w-96 bg-slate-500'>
      ask.jdlwj
    </div>
    <div className='h-56 w-96 bg-slate-500'>
      ask.jdlwj
    </div>
    <div className='h-56 w-96 bg-slate-500'>
      ask.jdlwj
    </div>
    <div className='h-56 w-96 bg-slate-500'>
      ask.jdlwj
    </div>

    </div>
    </div>



    </div>

  )
}

export default Main