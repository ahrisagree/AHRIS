import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from "react-router-dom";
import { ROLES } from 'utils/constant';
import NoPage from 'views/NoPage';

const PrivateRoute = ({access, component, ...restProps}) => {
  const user = useSelector(state=>state.auth.user);
  const { role } = user || {};
  const hasAccess = (access || ROLES).includes(role) || restProps.path === "/login";

  return <Route {...restProps} component={hasAccess ? component : NoPage} />;
};

export default PrivateRoute;