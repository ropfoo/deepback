import { createContext } from 'react';

export interface User {
  isLoggedIn: boolean;
  uid: string;
  name: string;
}

export interface QuestionView {
  letterVisible: boolean;
  view: string;
  loaded: boolean;
  answer: object;
  stats: object;
}

export const AuthContext = createContext({});
export const QuestionContext = createContext({});
