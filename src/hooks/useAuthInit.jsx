import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore'
import { clearAuthData, loadAuthData } from '../stores/authStorage';
import api from '../lib/axiosInstance';

export const useAuthInit = () => {
  const setAuth = useAuthStore(state=>state.setAuth);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  useEffect(()=>{
    const data = loadAuthData();
    if (data)
      setAuth(data);

    // 액세스 토큰이 있을 경우에만 체크
    if(data && data.accessToken) {
      setLoading(true);
      api.get('/api/check').then(res=>{
        // 토큰이 현재 유효함. 할일 없음
        console.log("유효")
      }).catch(err=>{
        if(!err.response) {
          // 네트워크 오류. 응답이 없다
          setError('네트워크 오류 발생');
          console.log("네트워크 에러")
        } else if(err.response.status===401) {
          clearAuthData();
          useAuthStore.getState().clearAuth();  
          console.log("무효")
        } else {
          setError(`오류 발생 : ${err.response.status}`)
          console.log("제너럴 오류")
        }
      }).finally(()=>{
        console.log("finally");
        setLoading(false);
      })
    }
  }, []);

  return {error, loading};
}
