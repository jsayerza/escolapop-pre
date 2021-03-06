import { useState, useEffect, createContext, useContext } from "react";
import {
  loginWithGoogle,
  authStateChanged,
  firebaseLogout,
} from "../firebase/client";

const USER_STATES = {
  NOT_LOGGED: null,
};

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(USER_STATES.NOT_LOGGED);

  useEffect(() => {
    function user() {
      authStateChanged(setUser);
    }
    user();
  }, []);

  /* OJO LOGICA PARA LAS RUTAS DE ATENTICACION

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push("/Login");
  }, [user]); */

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(setUser)
      .catch((error) => console.error(error));
  };

  const handleRegisterWithGoogle = () => {
    loginWithGoogle()
      .then(setUser)
      .catch((error) => console.error(error));
  };

  const value = {
    user,
    setUser,
    handleGoogleLogin,
    handleRegisterWithGoogle,
    firebaseLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// hook para usar el contexto en cualquier component de la app
export const useUser = () => {
  return useContext(AuthContext);
};
