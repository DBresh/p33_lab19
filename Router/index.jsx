import {Route, Routes} from 'react-router-dom'
import React from 'react';
import Home from '../Pages/Home'
import AboutCountry from '../Pages/AboutCountry';
import Languages from "../Components/Languages"

function AppRouter(){
   sessionStorage.setItem("pageNum", 1);
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/:cca3" element={<AboutCountry />} />
        <Route path="/languane/:lang" element={<Languages />}></Route>
      </Routes>
    );
}

export default AppRouter