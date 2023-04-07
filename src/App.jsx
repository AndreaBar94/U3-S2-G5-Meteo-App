import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Searchbar from "./components/Searchbar";

function App() {
  return (
    <Searchbar/>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Searchbar/>}/>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
