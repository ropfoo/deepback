// --- Reducer ---

export const loggedIn = (state = false, action: any) => {
  switch (action.type) {
    case 'SIGN_IN':
      return true;
    default:
      return state;
  }
};

// --- Dispatch ---

export const logIn = () => {
  return {
    type: 'SIGN_IN',
  };
};
