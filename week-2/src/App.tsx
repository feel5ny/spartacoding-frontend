import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<>메인</>} />
      <Route path="/sign-up" element={<>회원가입</>} />
    </Routes>
  );
}

export default App;
