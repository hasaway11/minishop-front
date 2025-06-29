import api from "../lib/axiosInstance";

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