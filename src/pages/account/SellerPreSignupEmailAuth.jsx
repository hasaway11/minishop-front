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

  const handleRequest=async()=>{
    if(requestStatus===AsyncStatus.SUBMITTING) return;
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
    if(verifyStatus===AsyncStatus.SUBMITTING) return;
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
      {!(requestStatus===AsyncStatus.SUCCESS) && (<div>
        <h1>이메일을 입력해 확인코드를 받으세요</h1>
        <AlertMessage visible={requestStatus===AsyncStatus.FAIL} variant='danger' message="확인코드를 신청하지 못했습니다" />
        <div>
          <TextField name="email" label="이메일:" {...vEmail} />
          <BlockButton label="이메일 확인" onClick={handleRequest} styleName='primary'/>
        </div>
      </div>
      )}
      {(requestStatus===AsyncStatus.SUCCESS) && (<div>
        <h1>확인코드를 인증하세요</h1>
        <AlertMessage visible={verifyStatus===AsyncStatus.FAIL} variant='danger' message="확인코드를 인증하지 못했습니다" />
        <div>
          <TextField name="code" label="확인코드:" {...vVerificationCode} />
          <BlockButton label="확인코드 인증" onClick={verifyCode} styleName='dark' />
        </div>
      </div>
      )}
    </div>
  )
}

export default SellerPreSignupCheck