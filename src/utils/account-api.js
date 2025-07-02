import axios from "axios";
import api from "../lib/axiosInstance";

// api 객체를 사용하면 인터셉터를 다시 거치면서 tokenRefresh  요청을 재전송 -> 무한루프발생
// 토큰 갱신 요청은 api 객체를 사용하면 안된다
export const tokenRefresh = (refreshToken)=>axios.post('http://localhost:8080/api/refresh', new URLSearchParams({refreshToken}));

export const idAvailableCheck = (username)=>api.get(`/api/accounts/check-id?username=${username}`);

export const requestVerifyCode = (object)=>api.post('/api/email-verification/request', new URLSearchParams(object));

export const checkVerifyCode = (object)=>api.post('/api/email-verification/check', new URLSearchParams(object));

export const memberSignup = (formData)=>api.post('/api/members/new', formData);

export const sellerSignup = (object)=>api.post('/api/sellers/new', new URLSearchParams(object));

export const findId = (email)=>api.get(`/api/account/username?email=${email}`);

export const checkPassword = (password)=>api.get(`/api/members/check-password?password=${password}`);

export const resetPassword = (object)=>api.put('/api/members/password', new URLSearchParams(object));

export const read = ()=>api.get('/api/members/member').then(res => res.data);

export const changeProfile = (formData)=>api.put('/api/members/profile', formData)

export const changePassword = (object)=>api.patch('/api/members/password', new URLSearchParams(object));

export const resign = ()=>api.delete('/api/members/member');