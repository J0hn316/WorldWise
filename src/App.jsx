import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Product from './pages/Product/Product';
import Pricing from './pages/Pricing/Pricing';
import AppLayout from './pages/AppLayout/AppLayout';
import PageNotFound from './pages/PageNotFound';
import Homepage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="app" element={<AppLayout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
