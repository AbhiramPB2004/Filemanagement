import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FileUpload from './components/FileUpload';
import Main from './components/Main';
import Test from './components/Test';
function App() {
  return (
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/fileupload" element={<FileUpload/>}></Route>
        <Route path="/test" element={<Test/>}></Route>
   
      </Routes>
    </BrowserRouter>
  );
}

export default App;
