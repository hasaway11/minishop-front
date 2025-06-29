import { useState } from "react";
import { findId } from "../../utils/account-api";
import { AsyncStatus } from "../../utils/constants";

import useEmail from "../../hooks/useEmail";
import TextField from "../../components/common/TextField";
import BlockButton from "../../components/common/BlockButton";
import AlertMessage from "../../components/common/AlertMessage";

function SearchId() {
 // 1. 필요한 기능 가져오기(작성 상태, 이메일 입력 커스텀 훅, 아이디 검색 결과 상태)
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const vEmail = useEmail();
  const [username, setUsername] = useState('');

  const init=()=>{
    // 아이디 검색 결과를 리셋
    setUsername("");
    setStatus(AsyncStatus.IDLE);
  }

  const handleFindId=async ()=>{ 
    if(status===AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);
    if (!vEmail.onBlur()) {
      setStatus(AsyncStatus.IDLE);
      return;
    }
    try {
      const response = await findId(vEmail.value);
      setUsername(response.data);
      setStatus(AsyncStatus.SUCCESS);
    } catch(err) {
      setStatus(AsyncStatus.FAIL);
      console.log(err);
    }
  }

  const handleBlur = ()=>{
    init();
    vEmail.onBlur();
  }

  return (
    <div>
      <h1>아이디 찾기</h1>
      <AlertMessage visible={status===AsyncStatus.SUCCESS} variant='success' message={`당신의 아이디 : ${username}`} />
      <AlertMessage visible={status===AsyncStatus.FAIL} variant='danger' message='아이디를 찾지 못했습니다' />
      <div style={{height:200}}>
        <TextField label='이메일' name='email' value={vEmail.value} message={vEmail.message} onChange={vEmail.onChange} onBlur={handleBlur} />
      </div>
      <BlockButton label={status===AsyncStatus.SUBMITTING ? "찾는 중..." : "아이디 찾기"} onClick={handleFindId} styleName='dark' disabled={status===AsyncStatus.SUBMITTING} />
    </div>
  )
}

export default SearchId
