import { useEffect } from 'react';

export const IntersectionObserverBox = () => {
  const options = {
    // 表示重叠面积占被观察者的比例，从 0 - 1 取值，
    // 1 表示完全被包含
    threshold: 1.0,
    root: document.querySelector('#scrollArea') // 必须是目标元素的父级元素
  };

  const callback = (entries: any) => {
    console.log(entries);
    entries.forEach((entry: any) => {
      entry.time; // 触发的时间
      entry.rootBounds; // 根元素的位置矩形，这种情况下为视窗位置
      entry.boundingClientRect; // 被观察者的位置举行
      entry.intersectionRect; // 重叠区域的位置矩形
      entry.intersectionRatio; // 重叠区域占被观察者面积的比例（被观察者不是矩形时也按照矩形计算）
      entry.target; // 被观察者
      if (entry.isIntersecting) {
        const target = document.querySelector('.target');
        target?.setAttribute('style', 'background:yellow;bottom:-100px;');

        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  useEffect(() => {
    const target = document.querySelector('.target');
    if (target) {
      observer.observe(target);
    }
  }, []);

  return (
    <div className="flex justify-center h-lg">
      <div
        style={{ bottom: '-100px' }}
        className="absolute h-8 bg-red-300 target"
      >
        1
      </div>
    </div>
  );
};

export default IntersectionObserverBox;
