import {Route, Routes} from 'react-router-dom'
import React from 'react';
import Home from '../Pages/Home'
import AboutCountry from '../Pages/AboutCountry';

function AppRouter(){
   sessionStorage.setItem("pageNum", 1);
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/:cca3" element={<AboutCountry />} />
      </Routes>
    );
}

export default AppRouter