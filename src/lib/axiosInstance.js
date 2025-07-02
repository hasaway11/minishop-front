import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";
import { getRefreshToken, updateAccessToken } from "../stores/authStorage";
import { navigate } from "./navigate";
import { tokenRefresh } from "../utils/account-api";

const api = axios.create({baseURL: "http://localhost:8080"});

api.interceptors.request.use(
  (config)=>{
    const token = useAuthStore.getState().accessToken;
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err)=>Promise.reject(err)
)

api.interceptors.response.use(
  (res)=>res,
  async (err)=>{
    const originalRequest= err.config;
    // 이미 재시도한 요청이라면 바로 실패 처리
    if(err.response.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        if(!refreshToken) {
          navigate('/account/login');
        }
        const res = await tokenRefresh(refreshToken);
        const newAccessToken = res.data;

        // 갱신된 토큰 저장
        updateAccessToken(newAccessToken);
        useAuthStore.getState().updateAccessToken(newAccessToken);

        // 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch(refreshErr) {
        // 재발급도 실패 → 로그인 페이지로 이동
        useAuthStore.getState().clearAuth();
        localStorage.clear();
        navigate('/account/login');
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  }
);

export default api;