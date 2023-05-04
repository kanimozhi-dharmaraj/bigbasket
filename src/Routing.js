import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from './Home/Home';
import Filter from './Filter/Filter';
import Product from './Product/Product';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Routing = () => {


  return (
    <BrowserRouter>
    
    <Header />
    <Routes>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/Product" element={<Product />}></Route>
          <Route path="/Filter" element={<Filter />}></Route>
          
          <Route path="*" element={<Navigate to="/Home"></Navigate>}></Route>
        </Routes>
       <Footer />

    </BrowserRouter>
  );
};

export default Routing;
