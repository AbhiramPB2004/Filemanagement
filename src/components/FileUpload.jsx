import React from 'react'
import { useState } from 'react';
import axios from 'axios';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    
    const uploadFile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('filename', filename);  
        try {
            const res = await axios.post('http://localhost:4000/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
      
            const { file } = res.data;
      
            setUploadedFile(file);
            alert('File Uploaded Successfully');
          } catch (err) {
            console.error(err);
            if (err.response.status === 500) {
              console.error('There was a problem with the server');
            } else {
              console.error(err.response.data.msg);
            }
          }
      
    }
  return (
    
    <form className='flex  flex-colself-center h-screen items-center justify-center'>
    <div className='flex flex-col  rounded-lg items-center justify-center bg-green-300 h-[500px] w-[500px] font-sans '>
        <div className='p-5 font-sans font-bold text-3xl'>FileUpload</div>
        <div className='flex flex-row p-5'>
            <div className='p-2 font-mono text-xl'>File name:</div>
            <div className='p-2'><input onChange={(e)=>{setFilename(e.target.value)}}></input></div>
        </div>
        <div className='p-2'>
            <input type='file' onChange={(e) =>{setFile(e.target.files[0])}}/>
        </div>
        <div p-5>
            <button onClick={uploadFile} type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >
                Submit
            </button>
        </div>
    </div>
    </form>
  )
}

export default FileUpload