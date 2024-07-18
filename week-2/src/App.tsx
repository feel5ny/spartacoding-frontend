import { Route, Routes } from 'react-router-dom';
import { SignUpPage } from './page/sign-up-page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<>메인</>} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-up/success" element={<>성공</>} />
      <Route path="/sign-up/fail" element={<>실패</>} />
    </Routes>
  );
}

export default App;
