import { ReactNode, useEffect, useState } from 'react';

export const Inp = () => {
  const [count, setCount] = useState(0);
  const [inpValue, setInpValue] = useState<null | number>(null);
  const [elements, setElements] = useState<ReactNode[]>([]);

  useEffect(() => {}, []);

  const handleClick = () => {
    setCount(count + 1);

    // 많은 DOM 요소를 생성하여 INP 지표를 나쁘게 만듦
    const newElements: ReactNode[] = [];
    for (let i = 0; i < 10000; i++) {
      newElements.push(<div key={i}>Element {i}</div>);
    }
    setElements(newElements);
  };

  return (
    <div>
      <h1>INP Example</h1>
      <button onClick={handleClick}>Click me</button>
      <p>Button clicked {count} times</p>
      {inpValue && <p>INP value: {inpValue.toFixed(2)} ms</p>}
      <div>{elements}</div>
    </div>
  );
};
