import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Search from './pages/Search';
import React from 'react';
import { DataProvider } from './context/DataContext';
import ImageTree from './pages/ImageTree';
function App() {
  return (
    <BrowserRouter>
    <DataProvider>
    <Navbar />
   <Routes>
     <Route path="/" element={<Home/>} />
     <Route path="/search" element={<Search />} />
     <Route path="/ImageTree" element={<ImageTree />} />
     {/* <Route path="*" element={<MinLoader />} /> */}
   </Routes>
     </DataProvider>
 </BrowserRouter>
  );
}

export default App;
