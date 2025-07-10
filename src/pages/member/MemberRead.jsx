import 'react-tabs/style/react-tabs.css';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useEffect, useState } from 'react';
import { changeProfile, fetchMyInfo } from '../../utils/account-api';
import useSWR, { mutate } from 'swr';
import { fetchOrderList } from '../../utils/order-api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Alert } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ImageField from '../../components/common/ImageField';
import useImage from '../../hooks/useImage';
import { AsyncStatus } from '../../utils/constants';
import usePasswordStore from '../../stores/usePasswordStore';

function OrderElement({order}) {
  const {id,orderTotalPrice, orderAt, name, count} = order;
  return (
    <>
      <Alert variant="secondary">주문 - {orderAt} (결제금액 {orderTotalPrice}원)</Alert>
      <div style={{textAlign:'right'}}>
        {name}외 {count}건 <Link to={`/member/order?id=${id}`}>전제 상품보기</Link>
      </div>
      <hr/>
    </>
  )
}

function MemberRead() {
  const navigate = useNavigate();
  const isPasswordVerified = usePasswordStore(state=>state.isPasswordVerified);
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const [tabIndex, setTabIndex] = useState(0);
  const vProfile = useImage();

  // 비밀번호를 확인되지 않는 경우 -> 저 아래에서 /member/check-password로 이동되지만, 그 전에 useSWR API 호출을 막아야 한다
  // useSWR 훅은 키를 null로 지정할 경우  훅을 실행하지 않는다

  // 탭1: 내 정보 데이터 SWR(탭1일 때만 요청)
  const { data: myInfo, error: errorInfo, isLoading: loadingInfo } = useSWR(isPasswordVerified && tabIndex === 0 ? 'myInfo' : null, fetchMyInfo);
  // 탭2: 내 주문 데이터 SWR(탭2일 때만 요청)
  const { data: myOrders, error: errorOrders, isLoading: loadingOrders } = useSWR(isPasswordVerified && tabIndex === 1 ? 'myOrders' : null, fetchOrderList);

   // 3. 데이터가 fetch되고 나면 프로필 커스텀 훅 초기화
  useEffect(()=>{
    if(myInfo) 
      vProfile.setPreviewImage(myInfo.profile);
  }, [myInfo]);

 const handleChangeProfile=async()=>{
    if(status===AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    if(!vProfile.value)
      return;
    try {
      const formData = new FormData();
      formData.append('profile', vProfile.value);
      const newProfileName = await changeProfile(formData);
      mutate({ ...myInfo, profile: newProfileName }, false); 
      setStatus(AsyncStatus.SUCCESS);
    } catch(err) {
      setStatus(AsyncStatus.FAIL);
      console.log(err);
    } 
  }

  if(isPasswordVerified===false) return <Navigate to="/member/check-password" replace />

  return (
    <Tabs selectedIndex={tabIndex} onSelect={setTabIndex}>
      <TabList>
        <Tab>회원 정보</Tab>
        <Tab>주문 내역</Tab>
      </TabList>

      <TabPanel>
        {loadingInfo && <LoadingSpinner />}
        {errorInfo && <Alert variant='danger'>내 정보 로딩 에러: {errorInfo.message}</Alert>}
        {myInfo && (
          <table className='table table-border'>
            <tbody>
              <tr>
                <td>
                  <ImageField name="profile" label="프로필" alt="미리보기" {...vProfile} />
                  <button className='btn btn-primary' onClick={handleChangeProfile}>프로필 변경</button>
                </td>
              </tr>
              <tr>
                <td>{myInfo.username}님 ({myInfo.email})</td>
              </tr>
              <tr>
                <td>생일</td>
                <td>{myInfo.birthDate}</td>
              </tr>
              <tr>
                <td>가입일</td>
                <td>{myInfo.signupDate} ({myInfo.days}일 경과)</td>
              </tr>
              <tr>
                <td>레벨</td>
                <td>{myInfo.level} ({myInfo.orderCount}회 구입)</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <button className='btn btn-success' onClick={()=>navigate('/member/change/password')}>비밀번호 변경으로</button>
                </td>
              </tr>
            </tbody>
          </table>) }
      </TabPanel>
      <TabPanel>
        {loadingInfo && <LoadingSpinner />}
        {errorOrders && <Alert variant='danger'>내 주문 로딩 에러: {errorOrders.message}</Alert>}
        {myOrders && (
          <div>
            <hr/>
            {
              myOrders.map(order=>{
                return(
                  <OrderElement key={order.id} order={order} />
                )
              })
            }
          </div>)}
      </TabPanel>
    </Tabs>
  );
}

export default MemberRead