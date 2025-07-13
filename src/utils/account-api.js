import axios from "axios";
import api from "../lib/axiosInstance";

// api 객체를 사용하면 인터셉터를 다시 거치면서 tokenRefresh  요청을 재전송 -> 무한루프발생
// 토큰 갱신 요청은 api 객체를 사용하면 안된다
// 2. 토큰 갱신 (/api/refresh)
export const requestRefreshToken = (refreshToken)=>axios.post('http://localhost:8080/api/refresh', new URLSearchParams({refreshToken}));



// 3. 아이디 사용여부 확인
export const idAvailableCheck = (username)=>api.get(`/api/accounts/check-username?username=${username}`);
// 4. 아이디 찾기
export const findId = (email)=>api.get(`/api/accounts/find-username?email=${email}`);
// 5. 임시비밀번호 발급
export const resetPassword = (object)=>api.post('/api/accounts/reset-password', new URLSearchParams(object));
// 6. 비밀번호 확인
export const checkPassword = (password)=>api.get(`/api/accounts/check-password?password=${password}`);
// 7. 비밀번호 변경
export const changePassword = (object)=>api.put('/api/accounts/password', new URLSearchParams(object));


// 8. 일반회원 가입
export const memberSignup = (formData)=>api.post('/api/members/new', formData);
// 9.  내정보 보기
export const fetchMyInfo=()=>api.get('/api/members').then(res => res.data);
// 10. 프사 변경
export const changeProfile = (formData)=>api.put('/api/members/profile', formData).then(res => res.data)


// 11. 가입 확인코드 신청
export const requestVerifyCode = (object)=>api.post('/api/email-verification/request', new URLSearchParams(object));
// 12. 확인코드 검증
export const checkVerifyCode = (object)=>api.post('/api/email-verification/check', new URLSearchParams(object));
// 13. 셀러회원 가입
export const sellerSignup = (object)=>api.post('/api/sellers/new', new URLSearchParams(object));
// 14. 판매자 정보 보기
export const readSellerInfo = ()=>api.delete('/api/sellers');