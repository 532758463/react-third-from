import { Tabs } from 'antd';
const { TabPane } = Tabs;
import Dong from './dog';
import RefDong from './dog/refIndex';
import RefDong2 from './dog/refIndex2';
export const ReactStudy = () => {
  const tabs = [
    {
      name: '闭包缺陷1',
      key: 'Dong',
      component: <Dong />
    },
    {
      name: '闭包缺陷2',
      key: 'Dong2',
      component: <RefDong />
    },
    {
      name: '闭包缺陷3',
      key: 'Dong3',
      component: <RefDong2 />
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

export default ReactStudy;
