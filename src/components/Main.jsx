import React from 'react'
import '../App.css';
import { redirect } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';
function Main() {
  const [files, setFiles] = useState([{"filename": "test"}]);

  const getFiles = async () => {
    console.log('inside');
    const resp = await axios.get('http://localhost:4000/');
    const data = resp.data;
    setFiles(data);
  }

  const downloadFile = async (filename) => {  
    try {
      const response = await axios.get(`http://localhost:4000/download/${filename}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('There was an error downloading the file!', error);
    }
  }

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <div className="App flex flex-col">
      <h1 className='text-5xl text-center font-sans font-bold'>File management</h1>
      <div className='p-5'>
        <a href='http://localhost:3000/fileupload'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Upload file
          </button>
        </a>
      </div>
      <div className='a'>
        <div className='grid grid-cols-4 grid-rows-4 auto-cols-max gap-0'>
          
          {files.map((file, index) => (
            <div className='h-56 w-96 shadow-2xl bg-lime-500 rounded-lg  flex flex-col self-center items-center justify-center'>
              <div className='font-sans font-semibold  rounded-lg p-11'>
                {file.filename}
              </div>
              <button className='bg-blue-400 p-1 rounded-2xl ' onClick={() => downloadFile(file.filename)}>Download</button>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default Main