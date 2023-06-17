import { Route, Routes, BrowserRouter } from 'react-router-dom';
import VirtualList from '@pages/virtual-list';
import TableList from '@pages/virtual-table';
import type { RouteProps } from 'react-router-dom';
import Navigation from '@pages/index';
import Console from '@pages/console';
import IConList from '@pages/icon-list';
import Grid from '@pages/grid';
import CssBox from '@pages/cssStudy';
import JsStudy from '@pages/jsStudy';
import ReactStudy from '@pages/react-study';

interface IRoute extends RouteProps {
  path: string;
  name: string;
}

export const routes: IRoute[] = [
  {
    path: '/list',
    element: <VirtualList />,
    name: '虚拟列表'
  },
  {
    path: '/table',
    element: <TableList />,
    name: '表格'
  },
  {
    path: '/console',
    element: <Console />,
    name: '输出结果'
  },
  {
    path: '/iconList',
    element: <IConList />,
    name: '图标组件'
  },
  {
    path: '/grid',
    element: <Grid />,
    name: 'Grid布局'
  },
  {
    path: '/css',
    element: <CssBox />,
    name: 'css学习'
  },
  {
    path: '/js',
    element: <JsStudy />,
    name: 'js学习'
  },
  {
    path: '/react',
    element: <ReactStudy />,
    name: 'react学习'
  }
];

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />} />
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
