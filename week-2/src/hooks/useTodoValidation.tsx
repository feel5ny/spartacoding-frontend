import { useState, useCallback } from 'react';

const useTodoValidation = () => {
  const [error, setError] = useState<string>('');

  const validate = useCallback(
    (task: string, deadline: string): boolean => {
      if (!task.trim()) {
        setError('할 일을 입력하세요.');
        return false;
      }
      if (task.length > 100) {
        setError('할 일은 최대 100자까지 입력 가능합니다.');
        return false;
      }
      const deadlineDate = new Date(deadline).setHours(0, 0, 0, 0);
      const today = new Date().setHours(0, 0, 0, 0);

      if (deadlineDate < today) {
        setError('마감일이 지난 날짜는 선택할 수 없습니다.');
        return false;
      }

      if (error) setError('');
      return true;
    },
    [error]
  );

  return { error, validate };
};

export default useTodoValidation;
