import Notes from "./Components/Notes";
import './App.css'
import { Route, Routes, } from 'react-router-dom';


function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Notes />} />
      <Route path="/Notes" element={<Notes />} />
    </Routes>
  );
}
export default App
