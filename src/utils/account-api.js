import axios from "axios";
import api from "../lib/axiosInstance";

// api 객체를 사용하면 인터셉터를 다시 거치면서 tokenRefresh  요청을 재전송 -> 무한루프발생
// 토큰 갱신 요청은 api 객체를 사용하면 안된다
export const requestRefreshToken = (refreshToken)=>axios.post('http://localhost:8080/api/refresh', new URLSearchParams({refreshToken}));

export const idAvailableCheck = (username)=>api.get(`/api/accounts/check-username?username=${username}`);

export const findId = (email)=>api.get(`/api/accounts/username?email=${email}`);

export const resetPassword = (object)=>api.put('/api/accounts/reset-password', new URLSearchParams(object));

export const checkPassword = (password)=>api.get(`/api/accounts/check-password?password=${password}`);

export const changePassword = (object)=>api.put('/api/accounts/password', new URLSearchParams(object));




export const memberSignup = (formData)=>api.post('/api/members/new', formData);

export const fetchMyInfo=()=>api.get('/api/members').then(res => res.data);

export const changeProfile = (formData)=>api.put('/api/members/profile', formData).then(res => res.data)


export const requestVerifyCode = (object)=>api.post('/api/email-verification/request', new URLSearchParams(object));

export const checkVerifyCode = (object)=>api.post('/api/email-verification/check', new URLSearchParams(object));

export const sellerSignup = (object)=>api.post('/api/sellers/new', new URLSearchParams(object));

export const readSellerInfo = ()=>api.delete('/api/sellers');