import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './hooks/Context';

interface Props {
  exact?: boolean;
  path: string;
  component: any;
}

const ProtectedRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const Auth: any = useContext(AuthContext);

  //console.log(Auth.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        Auth.user.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default ProtectedRoute;
