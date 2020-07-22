import { createContext } from 'react';

export interface User {
  isLoggedIn: boolean;
  uid: string;
  name: string;
}

export interface QuestionView {
  letterVisible: boolean;
  answered: boolean;
  loaded: boolean;
  answer: string;
}

export const AuthContext = createContext({});
export const QuestionContext = createContext({});
