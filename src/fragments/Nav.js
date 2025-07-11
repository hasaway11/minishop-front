import { useAuthStore } from "../stores/useAuthStore";
import { clearAuthData } from "../stores/authStorage";
import { Link } from "react-router-dom";

function Nav() {
  const role = useAuthStore(state=>state.role);
  const clearAuth = useAuthStore(state=>state.clearAuth);

  const handleLogout=async (e)=>{
    e.preventDefault();
    clearAuthData();
    clearAuth();
  }

  if(!role) {
    return (
      <nav>
        <ul>
          <li><Link to="/" style={{color:'white'}}>HOME</Link></li>
          <li><Link to="/account/member/signup">회원 가입</Link></li>
          <li><Link to="/account/seller/signup-check">셀러 회원 가입</Link></li>
          <li><Link to="/account/login">로그인</Link></li>
          <li><Link to="/account/search/id">아이디 찾기</Link></li>
          <li><Link to="/account/search/password">비밀번호 찾기</Link></li>
        </ul>
      </nav>
    )
  } else {
    if(role==='MEMBER') {
      return (
        <nav>
          <ul>
            <li><Link to="/" style={{color:'white'}}>HOME</Link></li>
            <li><Link to="/cart/cartlist">장바구니</Link></li>
            <li><Link to="/member/reviews">작성한 리뷰</Link></li>
            <li><Link to="/member/read">내정보</Link></li>
            <li><Link to="#" onClick={handleLogout}>로그아웃</Link></li>
          </ul>
        </nav>
      )
    } else if(role==='SELLER') {
      return (
        <nav>
          <ul>
            <li><Link to="/seller/product/list">내 상품</Link></li>
            <li><Link to="/seller/product/register">상품등록</Link></li>
            <li><Link to="/seller/order/list">주문 목록</Link></li>
            <li><Link to="#" onClick={handleLogout}>로그아웃</Link></li>
          </ul>
        </nav>
      )
    }
  }
}

export default Nav