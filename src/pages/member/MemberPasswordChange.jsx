import { useNavigate } from "react-router-dom";
import useConfirmPassword from "../../hooks/useConfirmPassword";
import TextField from "../../components/common/TextField";
import BlockButton from "../../components/common/BlockButton";
import { useState } from "react";
import { AsyncStatus } from "../../utils/constants";
import usePassword from "../../hooks/usePassword";
import { mutate } from "swr";
import { Alert } from "react-bootstrap";
import { changePassword } from "../../utils/account-api";

function MemberPasswordChange() {
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const vCurrentPassword = usePassword();
  const vNewPassword = usePassword();
  const vConfirmPassword = useConfirmPassword(vNewPassword);
  const navigate = useNavigate();

  const handleChangePassword=async ()=>{
    if(status===AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    const r1 = vCurrentPassword.onBlur();
    const r2 = vNewPassword.onBlur();
    const r3 = vConfirmPassword.onBlur();
    if (!(r1 && r2 && r3)) {
      setStatus(AsyncStatus.IDLE);
      return;
    }

    try {
      const requestForm = {currentPassword:vCurrentPassword.value, newPassword:vNewPassword.value};
      const {data} = await changePassword(requestForm);
      mutate('me', data, false);
      setStatus(AsyncStatus.SUCCESS);
      alert('비밀번호를 변경했습니다');
      navigate('/');
    } catch(err) {
      vCurrentPassword.reset();
      vNewPassword.reset();
      vConfirmPassword.reset();
      setStatus(AsyncStatus.FAIL);
    }
  }

  return (
    <div>
      <h1>비밀번호 변경</h1>
      <div style={{height:400}}>
        <TextField type='password' label='기존 비밀번호' name='current-password' {...vCurrentPassword} />
        <TextField type='password' label='새 비밀번호' name='new-password' {...vNewPassword} />
        <TextField type='password' label='비밀번호 확인' name='confirm-password' {...vConfirmPassword} />
        {status===AsyncStatus.FAIL &&  <Alert variant='danger'>비밀번호를 변경하지 못했습니다</Alert>}
      </div>
      <BlockButton label="비밀번호 변경" onClick={handleChangePassword} styleName='dark'/>
    </div>
  )
}

export default MemberPasswordChange