import React, { useState, createContext, Component } from 'react';

export interface User {
  isLoggedIn: boolean;
  uid: string;
  name: string;
}

export const AuthContext = createContext({});
