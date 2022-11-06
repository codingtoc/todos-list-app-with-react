import { onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import { auth, googleAuthProvider } from "../firebase-config";

const AuthContext = createContext({
  currentUser: null,
  onLogin: () => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.uid);
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const loginHandler = () => {
    signInWithRedirect(auth, googleAuthProvider);
  };

  const logoutHandler = () => {
    signOut(auth);
  };

  const contextValue = {
    currentUser: currentUser,
    onLogin: loginHandler,
    onLogout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
