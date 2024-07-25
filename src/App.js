import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FileUpload from './components/FileUpload';
import Main from './components/Main';

function App() {
  return (
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/fileupload" element={<FileUpload/>}></Route>
   
      </Routes>
    </BrowserRouter>
  );
}

export default App;
