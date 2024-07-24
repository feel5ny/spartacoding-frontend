import { useEffect } from 'react';
import throttle from 'lodash/throttle';

export const ThrottledScrollComponent = () => {
  useEffect(() => {
    /**
     * 일반적인 호출 형태
     */
    const handleScroll = () => {
      console.log('Scroll event triggered');
    };

    /**
     * throttle이 처리된 형태
     */
    const handleScrollThrottle = throttle(() => {
      console.log('Scroll event triggered');
    }, 200); // 200ms마다 실행

    window.addEventListener('scroll', handleScrollThrottle);

    return () => {
      window.removeEventListener('scroll', handleScrollThrottle);
    };
  }, []);

  return (
    <div style={{ height: '200vh' }}>
      <h1>Scroll down to see throttled event</h1>
    </div>
  );
};
