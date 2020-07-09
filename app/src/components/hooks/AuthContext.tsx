import React, { useState, createContext, Component } from 'react';

export interface User {
  isLoggedIn: boolean;
  uid: string;
  name: string;
}

interface Context {
  text: string;
}

export const AuthContext = createContext({});

// export const AuthProvider = (props: any) => {
//   const [user, setUser] = useState({
//     isLoggedIn: false,
//     uid: '',
//     name: '',
//   });

//   return (
//     <AuthContext.Provider value={{ user }}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };
