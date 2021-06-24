import { AppProps } from "next/dist/next-server/lib/router/router";
import React, { useMemo, useState, useEffect } from "react";
import { isUserLogged, logout } from "../services/token.service";
import { Token } from "../interfaces/token";
import AuthContext from "../context/AuthContext";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import router from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [auth, setAuth] = useState<Token | undefined | null>();
  const [userLogout, setUserLoggout] = useState<boolean>(false);
  useEffect(() => {
    setAuth(isUserLogged());
    return;
  }, [userLogout]);

  const handleLoggout = () => {
    logout();
    setUserLoggout(true);
    router.push("/auth");
  };
  const setUser = (user: Token | undefined) => {
    setAuth(user);
  };

  const authData = useMemo(
    () => ({
      auth,
      handleLoggout,
      setUser,
    }),
    [auth]
  );
  return (
    <>
      <AuthContext.Provider value={authData}>
        <Component {...pageProps} />
      </AuthContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        draggable
        pauseOnHover
      />
    </>
  );
}

export default MyApp;
