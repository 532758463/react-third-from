import { useEffect, useState } from 'react';

function Dong() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 500);
    return () => clearInterval(timer);
  }, [count]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count);
    }, 500);
    return () => clearInterval(timer);
  }, [count]);

  return <div>{count}</div>;
}

export default Dong;
