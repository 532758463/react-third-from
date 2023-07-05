import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navigation from '@pages/index';
import Grid from '@pages/grid';
import ThirdFormDemo from '@pages/third-from';
import ThirdForm from '@pages/third-from';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';

interface IRoute {
  path: string;
  name: string;
  element?: React.ReactNode | null;
}

export const routes: IRoute[] = [
  {
    path: '/grid',
    element: <Grid />,
    name: 'Grid布局'
  },
  {
    path: '/form-demo',
    element: <ThirdFormDemo />,
    name: '三方表单demo页'
  },
  {
    path: '/form',
    element: <ThirdForm />,
    name: '三方表单demo页'
  }
];

function Router() {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />} />
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default Router;
