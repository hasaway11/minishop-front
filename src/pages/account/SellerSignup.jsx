import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AsyncStatus } from "../../utils/constants";
import { sellerSignup } from "../../utils/account-api";

import useEmail from "../../hooks/useEmail";
import useInput from "../../hooks/useInput";
import usePassword from "../../hooks/usePassword";
import useUsername from "../../hooks/useUsername";
import TextField from "../../components/common/TextField";
import BlockButton from "../../components/common/BlockButton";
import useConfirmPassword from "../../hooks/useConfirmPassword";
import AlertMessage from "../../components/common/AlertMessage";

function SellerSignup() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(AsyncStatus.IDLE);

  const vUsername = useUsername();
  const vPassword = usePassword()
  const vConfirmPassword = useConfirmPassword(vPassword);
  const vEmail = useEmail();
  const vCompanyName = useInput();
  const vRepresentative = useInput();
  const vAddress = useInput();

  const handleSellerSignup=async()=>{
    if(status === AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    const r1 = await vUsername.onBlur();
    const r2 = vPassword.onBlur();
    const r3 = vConfirmPassword.onBlur();
    const r4 = vEmail.onBlur();
    const r5 = vCompanyName.onBlur();
    const r6 = vRepresentative.onBlur();
    const r7 = vAddress.onBlur();

    if (!(r1 && r2 && r3 && r4 && r5 && r6 && r7)) {
      setStatus(AsyncStatus.IDLE);
      return;
    }    

    const sellerSignupForm = {username:vUsername.value, password:vPassword.value, email:vEmail.value, companyName:vCompanyName.value, representative:vRepresentative.value, address:vAddress.value};
    try {
      await sellerSignup(sellerSignupForm );
      setStatus(AsyncStatus.SUCCESS);
      navigate("/account/login");
    } catch(err) {
      if(err.response.status===400) {
        setStatus(AsyncStatus.IDLE);
        alert('이메일 인증이 필요합니다. 이미 인증하셨다면 인증에 사용된 이메일을 입력하세요');
        vEmail.reset();
      } else {
        setStatus(AsyncStatus.FAIL);
        console.log(err);
      }
    }
  }

  return (
    <div>
      <h1>판매 회원 가입</h1>
      <AlertMessage visible={status===AsyncStatus.FAIL} variant='danger' message="회원 가입에 실패했습니다" />
      <TextField label="아이디" name="username" {...vUsername} />
      <TextField type="password" label="비밀번호" name="password" {...vPassword} />
      <TextField type="password" label="비밀번호 확인" name="confirm-password" {...vConfirmPassword} />
      <TextField label="이메일" name="email" {...vEmail} />
      <TextField label="사업체 이름" name="company-name" {...vCompanyName} />
      <TextField label="대표자 이름" name="representative" {...vRepresentative} />
      <TextField label="사업체 주소" name="address" {...vAddress} />
      <BlockButton label="판매회원 가입" onClick={handleSellerSignup} styleName='primary' />
    </div>
  )
}

export default SellerSignup

