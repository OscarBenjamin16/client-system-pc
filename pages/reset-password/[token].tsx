import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "../../components/GlobalComponents/Loading";
import { isSecurePassword } from "../../utils/rules";
import { resetPassword } from "../../services/auth.service";
import { toast } from "react-toastify";
import jwt from "jwt-decode";

const index = () => {
  const [data, setData] = useState({ password: "", repeatPassword: "" });
  const [tokenInfo, setTokenInfo] = useState<{} | undefined>();
  const [errors, setErrors] = useState({
    empty: false,
    notEqual: false,
    notConfirm: false,
    insecure: false,
    short: false,
  });
  const router = useRouter();
  const { token } = router.query;
  const setTokenToSate = () => {
    try {
      if (token) {
        setTokenInfo(token && jwt(String(token)));
      }
    } catch (error) {
      router.push("/404");
    }
  };
  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
  };
  const onsubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.password === "") {
      setErrors({ ...errors, empty: true });
      return;
    }
    if (data.repeatPassword === "") {
      setErrors({ ...errors, notConfirm: true });
      return;
    }
    if (!isSecurePassword(data.password)) {
      setErrors({ ...errors, insecure: true });
      return;
    }
    if (data.password !== data.repeatPassword) {
      setErrors({ ...errors, notEqual: true });
      return;
    }
    if (data.password.length <= 7) {
      setErrors({ ...errors, short: true });
      return;
    }
    const createdPassword = {
      newPassword: data.password,
    };
    resetPassword(createdPassword, String(token))
      .then((res) => {
        if (res.ok) {
          toast.success(res.message);
          router.push("/auth");
          return;
        }
        toast.error(res.message);
      })
      .catch(() => {
        console.log("Error");
      });
  };
  useEffect(() => {
    return setTokenToSate();
  }, [token]);
  return (
    <>
      {typeof token === "undefined" ? (
        <Loading />
      ) : (
        <>
          {tokenInfo && (
            <div className="flex justify-center items-center content-center">
              <div className="m-40 shadow p-8 flex-row rounded">
                <form onSubmit={onsubmit}>
                  <div className="flex flex-col">
                    <label className="text-sm font-ligth">Password</label>
                    <input
                      type="password"
                      name="password"
                      onChange={onchange}
                      placeholder="Ingresa tu nueva password"
                      className="border rounded px-4 py-1 text-sm mt-2 w-96"
                    />
                    {errors.empty && (
                      <span className="mt-2 text-red-500 text-sm font-normal">
                        No puedes dejar este campo vacio
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-ligth">
                      Repeat password
                    </label>
                    <input
                      onChange={onchange}
                      type="password"
                      name="repeatPassword"
                      placeholder="Confirma tu nueva password"
                      className="border rounded px-4 py-1 text-sm mt-2 w-96"
                    />
                    {errors.notConfirm && (
                      <span className="mt-2 text-red-500 text-sm font-normal">
                        Debes confirmar tu password
                      </span>
                    )}
                    {errors.notEqual && (
                      <span className="mt-2 text-red-500 text-sm font-normal">
                        Las password no coinciden
                      </span>
                    )}
                    {errors.insecure && (
                      <span className="mt-2 text-red-500 font-small font-normal">
                        Tu password debe incluir numeros signos y mayusculas
                      </span>
                    )}
                    {errors.insecure && (
                      <span className="mt-2 text-red-500 font-small font-normal">
                        Tu password debe ser mayor a 8 caracteres
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-green-400 w-full text-white rounded text-sm py-1 mt-2"
                  >
                    Guardar
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default index;
