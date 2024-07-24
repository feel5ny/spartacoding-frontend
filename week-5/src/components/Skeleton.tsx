import { useEffect, useState } from 'react';
import './Skeleton.css';

export const SkeletonSample = () => {
  const [data, setData] = useState<null | {
    avatar: string;
    title: string;
    description: string;
  }>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 데이터 로딩을 시뮬레이션합니다.
    setTimeout(() => {
      setData({
        avatar: 'https://via.placeholder.com/60',
        title: 'Lorem Ipsum',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt.',
      });
      setIsLoading(false);
    }, 2000); // 2초 후에 데이터 로딩 완료
  }, []);

  if (isLoading) {
    return <Skeleton />;
  }

  if (!data) return null;

  return (
    <div className="app">
      <div className="card">
        <img src={data.avatar} alt="Avatar" className="avatar" />
        <div className="content">
          <h2>{data.title}</h2>
          <p>{data.description}</p>
        </div>
      </div>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-content">
        <div className="skeleton-line short"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
      </div>
    </div>
  );
};
