import { useState } from "react";
import { AsyncStatus } from "../../utils/constants";
import usePasswordStore from "../../stores/usePasswordStore";
import { useNavigate } from "react-router-dom";
import usePassword from '../../hooks/usePassword'


function PasswordCheck() {
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const {isPasswordVerified, setPasswordVerified } = usePasswordStore();
  const vPassword = usePassword();
  const navigate = useNavigate();

  const isSubmitting = status === AsyncStatus.SUBMITTING;

  const handleCheckPassword=async ()=>{
    if(isSubmitting) return;
    setStatus(AsyncStatus.SUBMITTING);

    if (!(vPassword.onBlur())) {
      setStatus(AsyncStatus.IDLE);
      return;
    }
    
    try {
      await checkPassword(vPassword.value);
      setPasswordVerified();
      setStatus(AsyncStatus.SUCCESS);
      navigate("/member/read");
      return;
    } catch(err) {
      setStatus(AsyncStatus.FAIL);
      console.log(err);
    } 
  }

  // 4. 렌더링 조건 : 비밀번호가 확인된 경우 내정보 보기로 이동
  if (isPasswordVerified) return <Navigate to="/member/read" replace />;

  return (
    <div>
      {status===AsyncStatus.FAIL &&  <Alert variant='danger'>비밀번호를 확인하지 못했습니다</Alert>}
      <TextField type='password' label='비밀번호' name='password' {...vPassword} />
      <BlockButton label={isSubmitting? "비밀번호 확인 중...":"확 인"} onClick={handleCheckPassword} styleName='dark' disabled={isSubmitting}/>
    </div>
  )
}

export default PasswordCheck