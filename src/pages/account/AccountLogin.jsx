import { useState } from 'react'
import { AsyncStatus } from '../../utils/constants'
import { useNavigate } from 'react-router-dom';
import { saveAuthData } from '../../stores/authStorage';
import { useAuthStore } from '../../stores/useAuthStore';

import useUsername from '../../hooks/useUsername'
import usePassword from '../../hooks/usePassword';
import BlockButton from '../../components/common/BlockButton';
import TextField from '../../components/common/TextField';
import api from '../../lib/axiosInstance';
import AlertMessage from '../../components/common/AlertMessage';
import LoadingSpinner from '../../components/common/LoadingSpinner';

function AccountLogin() {
  const [dest, setDest] = useState(null);
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const vUsername = useUsername();
  const vPassword = usePassword();
  const navigate = useNavigate();
  const setAuth = useAuthStore(state=>state.setAuth);

  const handleLogin=async()=>{
    if(status===AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    const r1 = await vUsername.onBlur();
    const r2 = vPassword.onBlur();
    if(!(r1&&r2)) {
      setStatus(AsyncStatus.IDLE);
      return;
    }
    const loginRequest = {username:vUsername.value, password:vPassword.value};

    try {
      const response = await api.post('/api/login', new URLSearchParams(loginRequest));
      saveAuthData(response.data);
      setAuth(response.data);
      if(response.data.role==='MEMBER') 
        navigate('/');
      else
        navigate('/seller/product/list')
    } catch(err) {
    }
  };

  if(status===AsyncStatus.SUBMITTING) return <LoadingSpinner />

  return (
    <div>
      <h1>로그인</h1>
      <AlertMessage visible={status===AsyncStatus.FAIL} variant='danger' message="로그인 실패 : 이메일 또는 비밀번호를 다시 확인하세요" />
      <div style={{height:200}}>
        <TextField label='아이디' name="username" {...vUsername} />
        <TextField type='password' label='비밀번호' name="password" {...vPassword}/>
      </div>
      <BlockButton label="로그인" onClick={handleLogin} styleName='primary' />    
    </div>
  )
}

export default AccountLogin

