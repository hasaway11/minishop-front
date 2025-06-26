import axios from "axios";
import { useAuthStore } from "../stores/AuthStore";
import { getRefreshToken, saveAuthData, updateToken } from "../stores/authStorage";

const api = axios.create();

api.interceptors.request.use(
  (config)=>{
    const token = useAuthStore.getState().accessToken;
    if(token) 
      config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err)=>Promise.reject(err)
)

api.interceptors.response.use(
  (res)=>res,
  async (err)=>{
    const origiinalRequest= err.config;
    
    // 이미 재시도한 요청이라면 바로 실패 처리
    if(err.response.status == 401 && !origiinalRequest._retry) {
      origiinalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        if(!refreshToken)
          throw new Error('no refresh token');
        const res = await axios.post('/api/refresh', {refreshToken});
        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken;

        // 갱신된 토큰 저장
        updateToken({accessToken:newAccessToken, refreshToken:newRefreshToken});
        useAuthStore.getState().setT
      } catch(refreshErr) {

      }
    }
  }
)