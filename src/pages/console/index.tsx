import React from 'react';
import { flatten } from '@utils/flatten';

/**
 * 手写函数打印
 */

export const ConsoleFn: React.FC = () => {
  const arr = [1, 2, [3, 5], 5];
  const res = flatten(arr);

  return (
    <div className="flex items-center justify-center m-5 border-2 border-blue-300 h-96">
      {JSON.stringify(res)}
    </div>
  );
};

export default ConsoleFn;
