import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

/**
 * !좋아요 버튼을 낙관적 UI 전략으로 구현합니다.
 */
export const OptimizeUi = () => {
  const [like, setLike] = useState(false);

  const { mutate } = useMutation({
    mutationFn: (like: boolean) => {
      /**
       * ?임시로 비동기처리를 위해 Promise사용
       */
      return new Promise<boolean>((resolve) => {
        console.log('start >>> ');

        setTimeout(() => {
          resolve(like);
          console.log('end >>> ');
          /**
           * ? 3초의 pending을 부여합니다.
           */
        }, 3000);
      });
    },
    onSuccess: (like: boolean) => {
      /**
       * ? 비동기가 성공이 되면 요청했던 데이터로 UI를 업데이트합니다.
       */
      setLike(like);
    },
  });

  if (like)
    return (
      <>
        <h3>Optimistic UI Update</h3>
        <button
          onClick={() => {
            /**
             * * 낙관적 UI 적용부분
             */
            setLike((prev) => !prev);
            mutate(!like);
          }}
        >
          ❤️ 좋아요
        </button>
      </>
    );

  return (
    <>
      <h3>Optimistic UI Update</h3>
      <button
        onClick={() => {
          /**
           * * 낙관적 UI 적용부분
           */
          setLike((prev) => !prev);
          mutate(!like);
        }}
        style={{ color: 'lightgrey' }}
      >
        🤍 좋아요
      </button>
    </>
  );
};
