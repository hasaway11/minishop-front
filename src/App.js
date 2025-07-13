import { useNavigate } from 'react-router-dom';
import './App.css';
import { useAuthInit } from './hooks/useAuthInit';
import { setNavigate } from './lib/navigate';
import { useEffect } from 'react';

import Header from './fragments/Header';
import Nav from './fragments/Nav';
import Aside from './fragments/Aside';
import Footer from './fragments/Footer';
import AppRoute from './routes/AppRoute';
import { SWRConfig } from 'swr';

function App() {
  const navigate = useNavigate();

  // useNavigate훅을 생성해서 전역 JS에 저장
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  // 로컬 스토리지의 인증 정보를 store에 복사
  const {loading} = useAuthInit();

  if(loading) return <div>⏳ 로그인 상태 확인 중...</div>;
  
  return (
    <div className="App">
      <Header />
      <Nav />
      <main>
        <Aside />
        <section>
          <SWRConfig value={{ revalidateOnFocus: false, shouldRetryOnError: false }}>
            <AppRoute />
          </SWRConfig>
        </section>
        <Aside />
      </main>
      <Footer />      
    </div>
  );
}

export default App;
