import { useRef, useEffect, useLayoutEffect } from 'react';

function useInterval(fn: Function, time: number) {
  const ref = useRef(fn);

  useLayoutEffect(() => {
    ref.current = fn;
  });

  useEffect(() => {
    setInterval(() => ref.current(), time);
  }, []);
}

export default useInterval;
