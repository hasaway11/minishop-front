import { Route, Routes } from 'react-router-dom'

import PublicRoute from './PublicRoute';
import MemberRoute from './MemberRoute';
import SellerRoute from './SellerlRoute';
import PrivateRoute from './PrivateRoute';

import Login from '../pages/account/Login';
import SearchId from '../pages/account/SearchId';
import MemberSignup from '../pages/account/MemberSignup';
import SellerSignup from '../pages/account/SellerSignup';
import SearchPassword from '../pages/account/SearchPassword';
import SellerPreSignupEmailAuth from '../pages/account/SellerPreSignupEmailAuth';


import CartList from '../pages/cart/CartList';

import MyPage from '../pages/member/MyPage';
import MyOrder from '../pages/member/MyOrder';
import AllProductList from '../pages/AllProductList';
import ReviewWrited from '../pages/member/ReviewWrited';
import PasswordCheck from '../pages/member/PasswordCheck';
import ReviewWritable from '../pages/member/ReviewWritable';

import View from '../pages/product/View';
import Modify from '../pages/product/Modify';
import Register from '../pages/product/Register';
import SellerView from '../pages/product/SellerView';

import Order from '../pages/seller/Order';
import SellerProductList from '../pages/seller/SellerProductList';


function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<AllProductList/>} />
      <Route path="/account/member/signup" element={<PublicRoute element={<MemberSignup/>} />} />
      <Route path="/account/seller/signup-check" element={<PublicRoute element={<SellerPreSignupEmailAuth/>} />} />
      <Route path="/account/seller/signup" element={<PublicRoute element={<SellerSignup/>} />} />
      <Route path="/account/login" element={<PublicRoute element={<Login/>} />} />
      <Route path="/account/search/id" element={<PublicRoute element={<SearchId/>} />} />
      <Route path="/account/search/password" element={<PublicRoute element={<SearchPassword/>} />} />
      <Route path="/mypage/check" element={<PrivateRoute element={<PasswordCheck/>} />} />
      <Route path="/mypage/read" element={<PrivateRoute element={<MyPage/>} />} />
      <Route path="/mypage/order" element={<MemberRoute element={<MyOrder/>} />} />
      <Route path="/mypage/review/writable" element={<MemberRoute element={<ReviewWritable/>} />} />
      <Route path="/mypage/review/writed" element={<MemberRoute element={<ReviewWrited/>} />} />
      <Route path="/cart/cartlist" element={<MemberRoute element={<CartList/>} />} />
      <Route path="/product/view" element={<View/>} />
      <Route path="/seller/product/list" element={<SellerRoute element={<SellerProductList/>} />} />
      <Route path="/seller/product/register" element={<SellerRoute element={<Register/>} />} />
      <Route path="/seller/product/modify" element={<SellerRoute element={<Modify/>} />} />
      <Route path="/seller/product/view" element={<SellerRoute element={<SellerView/>} />} />
      <Route path="/seller/order" element={<SellerRoute element={<Order/>} />} />
    </Routes>
  )
}

export default AppRoute