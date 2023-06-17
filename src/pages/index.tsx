import React from 'react';
import { routes } from '../router';
import { NavLink } from 'react-router-dom';

export const Navigation: React.FC = () => {
  return (
    <div className="flex justify-center">
      {routes.map((route) => (
        <NavLink
          className="mr-20 border-b-2 border-transparent hover:border-blue-500 border-solid"
          key={route.path}
          to={route.path}
        >
          <div>{route.name}</div>
        </NavLink>
      ))}
    </div>
  );
};

export default Navigation;
