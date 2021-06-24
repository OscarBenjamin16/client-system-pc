import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import RegisterModal from "../../components/RegisterModal";
import { getToken } from "../../services/token.service";
import router from "next/router";
import Loading from "../../components/GlobalComponents/Loading";
import Login from "../../components/AuthComponents/Login";

import { Styles } from "../../utils/styles";

const auth = () => {
  const [showModal, setShowModal] = useState(false);
  const styles = new Styles();
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    if (getToken()) {
      router.push("/");
    }
  }),
    [];

  return (
    <Layout reload={reload} setReload={setReload}>
      {typeof getToken() === "undefined" ? (
        <>
          <div className="h-full w-full pt-12 pb-12">
            <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
              <div className="flex rounded-lg shadow-lg items-center justify-center w-6/12 sm:w-full md:w-9/12  lg:w-1/2 bg-white sm:mx-0">
                <div className="flex flex-col w-full lg:w-1/2 p-4">
                  <div className="flex flex-col flex-1 justify-center mb-8">
                    <h1 className="text-4xl text-center font-thin overflow-hidden">
                      Bienvenido!!
                    </h1>
                    <div className="w-full mt-4">
                      <Login />
                      <div className="text-center mt-4">
                        <a
                          className="no-underline hover:underline text-blue-dark text-xs"
                          href="/forgot-password"
                        >
                          Olvidaste tu contrasenia
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="hidden lg:block h-80 lg:w-1/2 rounded-r-lg"
                  style={styles.image}
                ></div>
              </div>
            </div>
          </div>
          <p className="text-center mt-4 mb-8">
            Aun no tienes una cuenta?{" "}
            <span
              onClick={() => setShowModal(true)}
              className="font-semibold cursor-pointer text-indigo-600"
            >
              REGISTRATE
            </span>
          </p>
          <RegisterModal showModal={showModal} setShowModal={setShowModal} />
        </>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

export default auth;
