import './App.css';
import { useAuthInit } from './hooks/useAuthInit';

function App() {
  useAuthInit();
  
  return (
    <div className="App">
    </div>
  );
}

export default App;
