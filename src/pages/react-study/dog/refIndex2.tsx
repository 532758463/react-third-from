import { useState } from 'react';
import useInterval from './useInterval';

function RefDong2() {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 1500);

  useInterval(() => {
    console.log(count);
  }, 1500);

  return <div>{count}</div>;
}

export default RefDong2;
