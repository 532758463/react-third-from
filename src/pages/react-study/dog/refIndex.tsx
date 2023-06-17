import { useEffect, useLayoutEffect, useState, useRef } from 'react';

function RefDong() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((count) => count + 1);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const fn = () => {
    console.log(count);
  };
  const ref = useRef(fn);

  useLayoutEffect(() => {
    ref.current = fn;
  });

  useEffect(() => {
    const timer = setInterval(() => ref.current(), 500);
    return () => clearInterval(timer);
  }, []);

  return <div>{count}</div>;
}

export default RefDong;
