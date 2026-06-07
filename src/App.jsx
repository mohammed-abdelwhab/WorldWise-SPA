import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import { useState } from "react";
import CityList from "./components/CityList";
function App() {
  const BASE_URL = "http://localhost:9000/cities";

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<CityList />} />
            <Route path="cities" element={<CityList />} />
            <Route path="countries" element={<h4>countries list</h4>} />
            <Route path="form" element={<h4>Form list</h4>} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
