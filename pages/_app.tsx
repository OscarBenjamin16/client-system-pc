import { AppProps } from "next/dist/next-server/lib/router/router"
import React,{useMemo,useState,useEffect} from 'react';
import { decodeToken,getToken } from "../services/token.service";
import { Token } from "../interfaces/token";
import jsCookie from 'js-cookie';
import AuthContext from "../context/AuthContext";
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }:AppProps) {
  const [auth, setAuth] = useState<Token | undefined>();
  const [userLogout,setUserLoggout] = useState<boolean>(false)
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuth(undefined);
    } else {
      const decode = decodeToken(token)
      setAuth(decode);
    }
    return
  }, [userLogout]);

  const logout = () => {
    jsCookie.remove("token")
    setUserLoggout(true)
  };
  const setUser = (user:Token | undefined) => {
    setAuth(user);
  };

  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser,
    }),
    [auth]
  );
    return (
      <AuthContext.Provider value={authData}>
        <Component {...pageProps} />
      </AuthContext.Provider>
    )
  }
  
  export default MyApp
  