import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navigation from '@pages/index';
import Grid from '@pages/grid';
import ThirdForm from '@pages/third-from';

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
    element: <ThirdForm />,
    name: '三方表单demo页'
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
