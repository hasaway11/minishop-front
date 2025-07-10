import { Route, Routes } from "react-router-dom"

import PublicRoute from './PublicRoute';
import MemberRoute from './MemberRoute';
import SellerRoute from './SellerRoute';


import AllProductList from '../pages/AllProductList';

import AccountLogin from '../pages/account/AccountLogin';
import MemberSignup from '../pages/account/MemberSignup';
import SearchId from '../pages/account/SearchId';
import SearchPassword from '../pages/account/SearchPassword';
import SellerPreSignupEmailAuth from '../pages/account/SellerPreSignupEmailAuth';
import SellerSignup from '../pages/account/SellerSignup';

import MemberRead from '../pages/member/MemberRead';
import MemberOrderDetail from '../pages/member/MemberOrderDetail';
import MemberPasswordChange from '../pages/member/MemberPasswordChange';
import PasswordCheck from '../pages/member/PasswordCheck';
import MemberReviewList from '../pages/member/MemberReviewList';
import ReviewWrite from '../pages/member/ReviewWrite';
import CartList from '../pages/member/CartList';
import CartCheckOut from '../pages/member/CartCheckOut';
import ProductView from '../pages/member/ProductView';


import SellerProductList from '../pages/seller/SellerProductList';
import ProductRegister from '../pages/seller/ProductRegister';
import ProductModify from '../pages/seller/ProductModify';
import SellerProductView from '../pages/seller/SellerProductView';
import SellerOrderList from '../pages/seller/SellerOrderList';
import NotFound from "../pages/NotFound";
import E403 from "../pages/E403";

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<AllProductList />} />

      <Route path="/account/member/signup" element={<PublicRoute element={<MemberSignup/>} />} />
      <Route path="/account/seller/signup-check" element={<PublicRoute element={<SellerPreSignupEmailAuth/>} />} />
      <Route path="/account/seller/signup" element={<PublicRoute element={<SellerSignup/>} />} />

      <Route path="/account/login" element={<AccountLogin/>} />
      <Route path="/account/search/id" element={<PublicRoute element={<SearchId/>} />} />
      <Route path="/account/search/password" element={<PublicRoute element={<SearchPassword/>} />} />

      <Route path="/member/check-password" element={<MemberRoute element={<PasswordCheck />} />} />
      <Route path="/member/read" element={<MemberRoute element={<MemberRead />} />} />
      <Route path="/member/order" element={<MemberRoute element={<MemberOrderDetail/>} />} />
      <Route path="/member/change/password" element={<MemberRoute element={<MemberPasswordChange />} />} />
      <Route path="/member/reviews" element={<MemberRoute element={<MemberReviewList/>} />} />
      <Route path="/member/review/write" element={<MemberRoute element={<ReviewWrite />} />} />
      <Route path="/cart/cartlist" element={<MemberRoute element={<CartList/>} />} />
      <Route path="/order/checkout" element={<MemberRoute element={<CartCheckOut/>} />} />
      <Route path="/product/view" element={<ProductView/>} />

      <Route path="/seller/product/list" element={<SellerRoute element={<SellerProductList/>} />} />
      <Route path="/seller/product/register" element={<SellerRoute element={<ProductRegister/>} />} />
      <Route path="/seller/product/modify" element={<SellerRoute element={<ProductModify/>} />} />
      <Route path="/seller/product/view" element={<SellerRoute element={<SellerProductView/>} />} />
      <Route path="/seller/order/list" element={<SellerRoute element={<SellerOrderList/>} />} />

      <Route path="/e403" element={<E403 />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoute