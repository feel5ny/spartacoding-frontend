import { Route, Routes } from 'react-router-dom';
import { SignUpPage } from './page/sign-up-page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<>메인</>} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
