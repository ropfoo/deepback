import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logIn } from '../../store/user';

const Login: React.FC = () => {
  const login = useSelector((state: any) => state.loggedIn);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => dispatch(logIn())}>log in</button>
      {login ? <p>logged in</p> : <p>not logged in</p>}
    </div>
  );
};

export default Login;
