import { Tabs } from 'antd';
import Box from './Box';
import BFC from './BFC';

const { TabPane } = Tabs;
export const CssSTudy = () => {
  const tabs = [
    {
      name: 'css盒模型',
      key: 'box',
      component: <Box />
    },
    {
      name: 'BFC',
      key: 'bfc',
      component: <BFC />
    }
  ];
  return (
    <Tabs defaultActiveKey="box" centered>
      {tabs.map((v) => (
        <TabPane tab={v.name} key={v.key}>
          {v.component}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default CssSTudy;
