import { useState, useEffect, createContext, useContext } from "react";
import {
  loginWithGoogle,
  authStateChanged,
  firebaseLogout,
} from "../firebase/client";
import axios from "axios";
import { HOST_SV } from "config/config";

const USER_STATES = {
  NOT_LOGGED: null,
};

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(USER_STATES.NOT_LOGGED);

  useEffect(() => {
    authStateChanged(setUser);
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
      .then(() => {
        axios.post(HOST_SV + "/api/register", {
          id: user.id,
          email: user.email,
          username: user.displayName,
        });
      })
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
