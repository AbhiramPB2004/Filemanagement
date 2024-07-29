import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/')
      .then(response => {
        setFiles(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the files!', error);
      });
  }, []);

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
  };

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.filename} 
            <button onClick={() => downloadFile(file.filename)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
