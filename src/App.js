import { useNavigate } from 'react-router-dom';
import './App.css';
import { useAuthInit } from './hooks/useAuthInit';
import { setNavigate } from './lib/navigate';

function App() {
  const navigate = useNavigate();

  // useNavigate훅을 생성해서 전역 JS에 저장합니다
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  // 로컬 스토리지의 인증 정보를 store에 복사
  useAuthInit();

  return (
    <div className="App">
    </div>
  );
}

export default App;
