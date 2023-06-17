import { Tabs } from 'antd';
const { TabPane } = Tabs;
import IntersectionObserverBox from './IntersectionObserverBox';

export const JsStudy = () => {
  const tabs = [
    {
      name: 'js',
      key: 'IntersectionObserverBox',
      component: <IntersectionObserverBox />
    }
  ];
  return (
    <Tabs defaultActiveKey="box" centered>
      {tabs.map((v) => (
        <TabPane className="h-lg" tab={v.name} key={v.key}>
          {v.component}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default JsStudy;
