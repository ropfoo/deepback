import { createContext } from 'react';

export interface User {
  isLoggedIn: boolean;
  uid: string;
  name: string;
}

export const AuthContext = createContext({});
export const QuestionContext = createContext({});
