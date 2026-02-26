import Notes from "./Components/Notes";
import Folder from "./Components/Folder"
import AppLayout from "./layout/AppLayout";
import './App.css'
import { Route, Routes, } from 'react-router-dom';


function App() {
  

  return (
    <Routes>
      <Route element={<AppLayout />}>
      <Route path="/" element={<Notes />} />
      <Route path="/Notes" element={<Notes />} />
      <Route path="/folders" element={<Folder/>}/>
      </Route>
    </Routes>
  );
}
export default App
