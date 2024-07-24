import { useState, useEffect } from 'react';

const LayoutShiftExample = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // 레이아웃을 변경할 내용을 일정 시간 후에 표시
    const timer1 = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {showContent && (
        <div
          role="banner"
          style={{
            width: '100%',
            height: '500px',
            backgroundColor: '#ddd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            borderRadius: '8px',
          }}
        >
          광고 배너
        </div>
      )}
      <h1>CLS 예제</h1>
      <p>이 페이지는 콘텐츠가 동적으로 로드되어 레이아웃이 변경됩니다.</p>
      <button>test</button>
    </div>
  );
};

export default LayoutShiftExample;
