import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useEmail from "../../hooks/useEmail"
import useInput from "../../hooks/useInput";
import { AsyncStatus } from "../../utils/constants";
import TextField from "../../components/common/TextField"
import BlockButton from "../../components/common/BlockButton"
import AlertMessage from "../../components/common/AlertMessage";
import { checkVerifyCode, requestVerifyCode } from "../../utils/account-api";

function SellerPreSignupCheck() {
  const vEmail = useEmail();
  const vVerificationCode = useInput();

  const [requestStatus, setRequestStatus] = useState(AsyncStatus.IDLE);
  const [verifyStatus, setVerifyStatus] = useState(AsyncStatus.IDLE);
  const navigate = useNavigate();

  const isRequestSuccess = requestStatus===AsyncStatus.SUCCESS;
  const isVerifyFail = verifyStatus===AsyncStatus.FAIL;

  const handleRequest=async()=>{
    if(isSubmitting) return;
    setRequestStatus(AsyncStatus.SUBMITTING);
    try {
      await requestVerifyCode({email:vEmail.value});
      setRequestStatus(AsyncStatus.SUCCESS);
    } catch(err) {
      setRequestStatus(AsyncStatus.FAIL);
      console.log(err);
    }
  }

  const verifyCode=async()=>{
    if(isSubmitting) return;
    setVerifyStatus(AsyncStatus.SUBMITTING);    
    try {
      await checkVerifyCode({email:vEmail.value, code:vVerificationCode.value});
      setVerifyStatus(AsyncStatus.SUCCESS);
      navigate("/account/seller/signup");
    } catch(err) {
      setVerifyStatus(AsyncStatus.FAIL);
      console.log(err);
    }
  }

  return (
    <div>
      <h1>이메일 인증</h1>
      <AlertMessage visible={isVerifyFail} variant='danger' message="인증코드를 확인하지 못했습니다" />
      {!isRequestSuccess && (
        <div>
          <TextField name="email" label="이메일:" {...vEmail} />
          <BlockButton label="이메일 확인" onClick={handleRequest} styleName='primary'/>
        </div>
      )}
      {isRequestSuccess && (
        <div>
          <TextField name="code" label="인증코드:" {...vVerificationCode} />
          <BlockButton label="인증코드 확인" onClick={verifyCode} styleName='dark' />
        </div>
      )}
    </div>
  )
}

export default SellerPreSignupCheck