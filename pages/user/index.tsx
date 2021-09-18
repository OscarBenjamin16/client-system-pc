import { useState, useEffect } from "react";
import { Context } from "../../interfaces/context";
import Layout from "../../components/Layout";
import {useAuth} from "../../hooks/useAuth";
import { getUserbyId } from "../../services/user.service";
import { UserDetail } from "../../interfaces/user";
import UserInfo from "../../components/UserComponents/UserInfo";
import Modal from "../../components/GlobalComponents/Modal";
import UserEditForm from "../../components/UserComponents/UserEditForm";
import { useRouter } from "next/router";
import { getToken } from "../../services/token.service";
import { toast } from "react-toastify";

const index = () => {
  const router = useRouter();
  const ctx: Context = useAuth();
  const [info, setInfo] = useState<UserDetail | undefined>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(true);
  const getUserInfo = () => {
    let id = ctx.auth?.clienteid
    getUserbyId(Number(id))
      .then((res) => {
        setInfo(res.cliente);
      })
      .catch(() => {
        toast.error("Ah ocurrido un error inesperado")
      });
  };
  useEffect(() => {
    getUserInfo();
    setReload(false);
    if (!getToken()) {
      router.push("/auth");
    }
    return;
  }, [reload,ctx]);
  const logout = () => {
    window.location.href = "/auth";
    ctx.handleLoggout()
  };
  return (
    <Layout>
      {info ? (
        <>
          <div className="flex flex-col md:flex-row m-5 shadow p-8">
            <div className="w-full p-5  md:ml-12 flex flex-col md:flex-row ">
              {info && <UserInfo info={info} />}
              {info && (
                <div className="mt-4 md:mt-auto flex">
                  <button
                    onClick={() => setShowModal(true)}
                    className="px-2 md:px-6 bg-green-500 py-1 text-white rounded-xl text-xs md:text-sm ml-4"
                  >
                    Editar Perfil
                  </button>
                  <Modal
                    setShowModal={setShowModal}
                    showModal={showModal}
                    title="Editar cuenta"
                  >
                    <UserEditForm
                      detail={info}
                      setReload={setReload}
                      setShowModal={setShowModal}
                    />
                  </Modal>
                  <button
                    onClick={logout}
                    className="px-2 md:px-6 ml-4 bg-red-500 py-1 text-white rounded-xl text-xs md:text-sm"
                  >
                    Cerrar Sesion
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>Cargando</p>
      )}
    </Layout>
  );
};

export default index;
{
  /*  */
}
