import 'react-tabs/style/react-tabs.css';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useState } from 'react';
import { fetchMyInfo, fetchMyOrders } from '../../utils/account-api';
import useSWR from 'swr';

function MemberRead() {
  const [tabIndex, setTabIndex] = useState(0);

  // 탭1: 내 정보 데이터 SWR(탭1일 때만 요청)
  const { data: myInfo, error: errorInfo, isLoading: loadingInfo } = useSWR(tabIndex === 0 ? 'myInfo' : null, fetchMyInfo);

  // 탭2: 내 주문 데이터 SWR(탭2일 때만 요청)
  const { data: myOrders, error: errorOrders, isLoading: loadingOrders } = useSWR(tabIndex === 1 ? 'myOrders' : null, fetchMyOrders);

  return (
    <Tabs selectedIndex={tabIndex} onSelect={setTabIndex}>
      <TabList>
        <Tab>탭 1</Tab>
        <Tab>탭 2</Tab>
      </TabList>

      <TabPanel>
        {loadingInfo && <p>내 정보 로딩 중...</p>}
        {errorInfo && <p style={{ color: 'red' }}>내 정보 로딩 에러: {errorInfo.message}</p>}
        {myInfo && (<pre>{JSON.stringify(myInfo, null, 2)}</pre>)}
      </TabPanel>
      <TabPanel>
        {loadingOrders && <p>내 주문 로딩 중...</p>}
        {errorOrders && <p style={{ color: 'red' }}>내 주문 로딩 에러: {errorOrders.message}</p>}
        {myOrders && (
          <pre>{JSON.stringify(myOrders, null, 2)}</pre>
        )}
      </TabPanel>
    </Tabs>
  );
}

export default MemberRead