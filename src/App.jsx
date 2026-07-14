import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HeaderProvider } from './context/HeaderContext';
import Home from "./pages/Home/Home";
import ProductsList from "./pages/Products/ProductsList/ProductsList";
import ProductView from "./pages/Products/ProductView/ProductView";
import NewProduct from "./pages/Products/NewProduct/NewProduct";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/Errors/NotFound/NotFound";
import Layout from './components/Layout/Layout';
import CategoriesList from './pages/Categories/CategoriesList/CategoriesList';
import NewCategories from './pages/Categories/NewCategories/NewCategories';

function App() {
  return (
    <HeaderProvider>
      <Layout>
          <Routes>
            <Route path="/" element= {<Home />}/>
            <Route path="/products" element= {<ProductsList/>}/>
            <Route path= "/products/new" element= {<NewProduct/>}/>
            <Route path= "/Products/:id" element= {<ProductView/>}/>
            <Route path='/categories' element={<CategoriesList/>}/>
            <Route path='/categories/new' element={<NewCategories/>}/>
            <Route path= "/profile" element= {<Profile/>}/>
            <Route path= "*" element= {<NotFound/>}/>
          </Routes>
      </Layout>
    </HeaderProvider>
  );
}

export default App;