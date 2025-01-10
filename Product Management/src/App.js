import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import ManageProducts from './components/ManageProducts';
import Settings from './components/Settings';
import { CssBaseline } from '@mui/material';

const App = () => {
  const [products, setProducts] = useState([]);

  
  const handleAddProduct = (newProduct) => {
    console.log("Adding Product:", newProduct); // Check if the product is added here
    setProducts((prevProducts) => [
      ...prevProducts, 
      { id: prevProducts.length + 1, ...newProduct }
    ]);
  };

  
  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
  };

  
  const handleEditProduct = (updatedProduct) => {
    setProducts((prevProducts) => 
      prevProducts.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  return (
    <div>
      <CssBaseline />
      <Header />
      <div style={{ display: 'flex', position: 'relative' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px', marginTop: '64px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route 
              path="/add-product" 
              element={<AddProduct onAddProduct={handleAddProduct} />} 
            />
            <Route 
              path="/product-list" 
              element={
                <ProductList 
                  products={products} 
                  setProducts={setProducts}
                  handleDeleteProduct={handleDeleteProduct}
                  handleEditProduct={handleEditProduct}
                />
              }
            />
            <Route path="/manage-products" element={<ManageProducts />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
