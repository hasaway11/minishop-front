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

import MyOrderList from '../pages/member/MyOrderList';
import MyOrderView from '../pages/member/MyOrderView';
import AllProductList from '../pages/AllProductList';
import MyReviewList from '../pages/member/MyReviewList';
import PasswordCheck from '../pages/member/PasswordCheck';

import View from '../pages/product/View';
import Modify from '../pages/product/Modify';
import Register from '../pages/product/Register';
import SellerView from '../pages/product/SellerView';

import CheckOut from '../pages/member/CheckOut';
import SellerProductList from '../pages/seller/SellerProductList';
import SellerOrderList from '../pages/seller/SellerOrderList';
import ReviewWrite from '../pages/member/ReviewWrite';
import MemberRead from '../pages/member/MemberRead';


function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<AllProductList />} />
      <Route path="/account/member/signup" element={<PublicRoute element={<MemberSignup/>} />} />
      <Route path="/account/seller/signup-check" element={<PublicRoute element={<SellerPreSignupEmailAuth/>} />} />
      <Route path="/account/seller/signup" element={<PublicRoute element={<SellerSignup/>} />} />
      <Route path="/account/login" element={<PublicRoute element={<Login/>} />} />
      <Route path="/account/search/id" element={<PublicRoute element={<SearchId/>} />} />
      <Route path="/account/search/password" element={<PublicRoute element={<SearchPassword/>} />} />
      <Route path="/mypage/check" element={<PrivateRoute element={<PasswordCheck/>} />} />
      <Route path="/mypage/orders" element={<MemberRoute element={<MyOrderList/>} />} />
      <Route path="/mypage/orders/view" element={<MemberRoute element={<MyOrderView/>} />} />
      <Route path="/mypage/reviews" element={<MemberRoute element={<MyReviewList/>} />} />
      <Route path="/mypage/review/write" element={<MemberRoute element={<ReviewWrite />} />} />
      <Route path="/cart/cartlist" element={<MemberRoute element={<CartList/>} />} />
      <Route path="/order/checkout" element={<MemberRoute element={<CheckOut/>} />} />
      <Route path="/product/view" element={<View/>} />
      <Route path="/test" element={<MemberRead />} />
      <Route path="/seller/product/list" element={<SellerProductList/>} />
      <Route path="/seller/product/register" element={<SellerRoute element={<Register/>} />} />
      <Route path="/seller/product/modify" element={<SellerRoute element={<Modify/>} />} />
      <Route path="/seller/product/view" element={<SellerRoute element={<SellerView/>} />} />
      <Route path="/seller/order/list" element={<SellerRoute element={<SellerOrderList/>} />} />
    </Routes>
  )
}

export default AppRoute