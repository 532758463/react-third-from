import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} from 'react';

interface Options {
  /* 容器高度 */
  height: number;
  /* 缓冲区个数 */
  bufferCount: number;
  /* 每一个item高度 */
  itemHeight: number;
  /* 渲染区个数 */
  renderCount: number;
}

const defaultOption: Options = {
  height: 500 /* 容器高度 */,
  bufferCount: 20 /* 缓冲区个数 */,
  itemHeight: 60 /* 每一个item高度 */,
  renderCount: 10 /* 渲染区个数 */
};

export const useVirtualTable = <T = any>(
  dataSource: T[],
  options?: Options
) => {
  const scrollInfo = useRef<Options>(defaultOption);
  const [position, setPosition] = useState([0, 0]);
  const tableWrapper = React.useRef<any>(null);

  useEffect(() => {
    const { itemHeight, bufferCount, height } = scrollInfo.current;
    if (options) {
      scrollInfo.current = options;
    }
    const renderCount = Math.ceil(height / itemHeight) + bufferCount;
    scrollInfo.current = { renderCount, height, bufferCount, itemHeight };
    setPosition([0, renderCount]);
  }, [options]);

  // useEffect(() => {
  //   // 滚动条滚动时触发
  //   window.addEventListener("scroll", scrollChange, true);

  //   return () => {
  //     window.removeEventListener("scroll", scrollChange, false);
  //   };
  // }, []);

  const scrollChange = useCallback((event: any) => {
    const scrollTop = event?.target?.scrollTop;

    const { itemHeight, renderCount } = scrollInfo.current;
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.floor(scrollTop / itemHeight + renderCount + 1);
    let currentOffset = scrollTop - (scrollTop % itemHeight);
    if (currentOffset > itemHeight) {
      currentOffset = currentOffset - itemHeight;
    }
    tableWrapper.current.style.transform = `translate3d(0, ${currentOffset}px, 0)`;

    if (end !== position[1] || start !== position[0]) {
      /* 如果render内容发生改变，那么截取  */
      setPosition([start, end]);
    }
  }, []);
  const [start, end] = position;
  const renderList = useMemo(() => {
    return dataSource.slice(start, end);
  }, [start, end, dataSource]);

  const holdHeight = useMemo(
    () => dataSource.length * scrollInfo?.current.itemHeight,
    [dataSource]
  );

  return {
    tableWrapper,
    scrollChange,
    renderList,
    holdHeight
  };
};
