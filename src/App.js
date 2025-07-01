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
import { Alert } from 'react-bootstrap';

function App() {
  const navigate = useNavigate();

  // useNavigate훅을 생성해서 전역 JS에 저장합니다
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  // 로컬 스토리지의 인증 정보를 store에 복사
  const {error, loading} = useAuthInit();
  
  return (
    <div className="App">
      <Header />
      <Nav />
      <main>
        <Aside />
        <section>
          {loading && <div>⏳ 로그인 상태 확인 중...</div>}
          {error && <Alert variant='danger'>{error}</Alert>}
          <AppRoute />
        </section>
        <Aside />
      </main>
      <Footer />      
    </div>
  );
}

export default App;
