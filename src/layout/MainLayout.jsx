import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductForm from '../pages/ProductForm';
import ProductDetails from '../pages/ProductDetails';
import NotFound from '../pages/NotFound';
import { BrowserRouter, Route, Routes } from "react-router";
import { SharedLayout } from '../shared_layout/SharedLayout';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Register from '../pages/Register';
import GuestGuard from '../guard/GuestGuard';
import AuthGuard from '../guard/AuthGuard';
import AdminGuard from '../guard/AdminGuard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUser } from '../store/userSlice';
import Dashboard from '../components/Dashboard';
export function MainLayout() {
  const { user, isLoading, errors } = useSelector(store => store.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser())
  }, []);
  const currentUser = user ? user : JSON.parse(sessionStorage.getItem('user'))
  const isAuthenticated = Boolean(currentUser);
  const isAdmin = isAuthenticated && currentUser.role == 'admin' ? true : false;
  return (
    < BrowserRouter >
      <Routes>
        <Route path='/' element={<SharedLayout />} >
          <Route index element={<Home />} />
          <Route path='shop' element={<Shop />} />
          <Route path='products/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />

          <Route element={<GuestGuard isAuthenticated={isAuthenticated} />}>
            <Route path="/login" element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>

          <Route element={<AdminGuard isAdmin={isAdmin} />}>
            <Route path='products/:id/edit' element={<ProductForm />} />
            <Route path='dashboard' element={<Dashboard />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}