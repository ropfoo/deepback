import React, { ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { User } from './hooks/AuthContext';

interface Props {
  exact?: boolean;
  path: string;
  component: any;
  user: User;
}

const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  user,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        user.isLoggedIn ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default ProtectedRoute;
