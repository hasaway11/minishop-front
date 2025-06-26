import { useEffect } from 'react';
import { useAuthStore } from '../stores/useAuthStore'
import { clearAuthData, loadAuthData, saveAuthData } from '../stores/authStorage';
import api from '../lib/axiosInstance';

export const useAuthInit = () => {
  const updateAuth = useAuthStore((state) => state.updateAuth);

  useEffect(()=>{
    const data = loadAuthData();
    if (data)
      updateAuth(data);

    // 액세스 토큰이 있을 경우에만 체크
    if(data.accessToken) {
      api.get('http://localhost:8080/api/check').then(res=>{
        const {accessToken, refreshToken, username, role} = res.data;
        saveAuthData({accessToken, refreshToken, username, role});
        useAuthStore.getState().setAuth({accessToken, refreshToken, username, role});
      }).catch(err=>{
        clearAuthData();
        useAuthStore.getState().clearAuth();
      })
    }
  }, []);
}
