import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AsyncStatus } from '../../utils/constants'
import { memberSignup } from "../../utils/account-api";

import useEmail from "../../hooks/useEmail";
import useImage from "../../hooks/useImage";
import useInput from "../../hooks/useInput";
import useUsername from '../../hooks/useUsername'
import usePassword from "../../hooks/usePassword";
import TextField from "../../components/common/TextField";
import BlockButton from "../../components/common/BlockButton";
import useConfirmPassword from "../../hooks/useConfirmPassword";
import AlertMessage from "../../components/common/AlertMessage";
import ImageField from "../../components/common/ImageField";
import LoadingSpinner from "../../components/common/LoadingSpinner";

function MemberSignup() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(AsyncStatus.IDLE);

  const vProfile = useImage();
  const vUsername = useUsername(true);
  const vPassword = usePassword()
  const vConfirmPassword = useConfirmPassword(vPassword);
  const vEmail = useEmail();
  const vBirthDate = useInput();

  const handleMemberSignup=async()=>{
    if(status === AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    const r1 = await vUsername.onBlur();
    const r2 = vPassword.onBlur();
    const r3 = vConfirmPassword.onBlur();
    const r4 = vEmail.onBlur();
    const r5 = vBirthDate.onBlur();

    if (!(r1 && r2 && r3 && r4 && r5)) {
      setStatus(AsyncStatus.FAIL);
      return;
    }

    const formData = new FormData();
    formData.append('profile', vProfile.value);
    formData.append('username', vUsername.value);
    formData.append('password', vPassword.value);
    formData.append('email', vEmail.value);
    formData.append('birthDate', vBirthDate.value);

    try {
      await memberSignup(formData);
      setStatus(AsyncStatus.SUCCESS);
      navigate("/account/login");
    } catch(err) {
      setStatus(AsyncStatus.FAIL);
      console.log(err);
    }
  }

  if(status===AsyncStatus.SUBMITTING) return <LoadingSpinner />
  return (
    <div>
      <h1>회원 가입</h1>
      <AlertMessage visible={status===AsyncStatus.FAIL} variant='danger' message="회원 가입에 실패했습니다" />
      <ImageField name='photo' label='사진' alt='미리보기' {...vProfile} />
      <TextField label='아이디' name='username' {...vUsername} />
      <TextField label='이메일' name='email' {...vEmail} />
      <TextField type='password' label='비밀번호' name='password' {...vPassword} />
      <TextField type='password' label='비밀번호 확인' name='confirm-password' {...vConfirmPassword} />
      <TextField type="date" label="생일" name="birth-date" {...vBirthDate} />
      <BlockButton label="일반회원 가입" onClick={handleMemberSignup} styleName='primary' />
     </div>
  )
}

export default MemberSignup