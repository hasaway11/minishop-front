import { useState } from "react";
import { AsyncStatus } from "../../utils/constants";
import { resetPassword } from "../../utils/account-api";

import useEmail from "../../hooks/useEmail";
import useUsername from "../../hooks/useUsername";
import TextField from "../../components/common/TextField";
import BlockButton from "../../components/common/BlockButton";
import { Alert } from "react-bootstrap";

function SearchPassword() {
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const vUsername = useUsername();
  const vEmail = useEmail();

  const handleResetUsername=async ()=>{
    if(status===AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    const r1 = vUsername.onBlur();
    const r2 = vEmail.onBlur();
    if (!(r1&&r2)) {
      setStatus(AsyncStatus.FAIL);
      return;
    }

    const obj = {username:vUsername.value, email:vEmail.value};
    try {
      await resetPassword(obj);
      setStatus(AsyncStatus.SUCCESS);
    } catch(err) {
      setStatus(AsyncStatus.FAIL);
    }
  }

  return (
    <div>
      <h1>비밀번호 찾기</h1>
      <p>&#x2714; 비밀번호의 경우 암호화 저장되어 분실 시 찾아드릴 수 없는 정보 입니다.</p>
      <p>&#x2714; 본인 확인을 통해 비밀번호를 재설정 하실 수 있습니다.</p>
      <TextField label='아이디' name='username' {...vUsername} />
      <TextField label='이메일' name='email' {...vEmail} />
      {(status===AsyncStatus.SUCCESS) && <Alert variant='success'>임시비밀번호를 이메일로 보냈습니다</Alert>}
      {(status===AsyncStatus.FAIL) && <Alert variant='danger'>사용자 정보를 확인하지 못했습니다</Alert>}
      <BlockButton label={status===AsyncStatus.SUBMITTING ? "찾는 중...":"비밀번호 찾기"} onClick={handleResetUsername} styleName='dark' disabled={status===AsyncStatus.SUBMITTING} />
    </div>
  )
}

export default SearchPassword