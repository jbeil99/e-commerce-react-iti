import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductForm from '../pages/ProductForm';
import ProductDetails from '../pages/ProductDetails';
import NotFound from '../pages/NotFound';
import { BrowserRouter, Route, Routes } from "react-router";
import { SharedLayout } from '../shared_layout/SharedLayout';
import Cart from '../pages/Cart';

export function MainLayout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />} >
          <Route index element={<Home />} />
          <Route path='shop' element={<Shop />} />
          <Route path='products/:id' element={<ProductDetails />} />
          <Route path='products/:id/edit' element={<ProductForm />} />
          <Route path='/cart' element={<Cart />} />

          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}