import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useInView } from 'react-intersection-observer';

function App() {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true, // 이미지가 한번만 로드되도록 설정
    threshold: 0.1, // 이미지의 10%가 보이면 로드
  });

  return (
    <main>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {count && (
        <img
          src="https://static.spartacodingclub.kr/TeamSparta-Inc/scc-frontend/assets/icons/logo-active.png"
          width="100%"
        />
      )}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* 여백 */}
      <div style={{ height: 1000 }}></div>

      {/* triggering */}
      <div ref={ref}></div>

      {inView && (
        <div
          style={{
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
            opacity: inView ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1573865526739-10659fec78a5"
            style={{ width: 200 }}
            fetchPriority="high"
          />
          <img
            src="https://images.unsplash.com/photo-1571566882372-1598d88abd90"
            style={{ width: 200 }}
          />
          <img
            src="https://images.unsplash.com/photo-1518288774672-b94e808873ff"
            style={{ width: 200 }}
          />
          <img
            src="https://images.unsplash.com/photo-1574144611937-0df059b5ef3e"
            style={{ width: 200 }}
          />
        </div>
      )}
    </main>
  );
}

export default App;
