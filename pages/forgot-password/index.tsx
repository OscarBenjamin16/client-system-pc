import { ChangeEvent, FormEvent, useState } from "react";
import { forgotPassword } from "../../services/auth.service";
import { isEmail } from "../../utils/rules";
import Link from "next/link";

const index = () => {
  const [values, setValues] = useState({
    email: "",
    notEmail: false,
    empty: false,
    emailOk: false,
    emailInvalid: false,
  });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.email === "") {
      setValues({ ...values, empty: true });
      return;
    }
    if (!isEmail(values.email)) {
      setValues({ ...values, notEmail: true, empty: false });
      return;
    }
    setValues({ ...values, notEmail: false, empty: false });
    forgotPassword(values.email).then((res) => {
      if (res.info === "Ok") {
        setValues({ ...values, emailOk: true, emailInvalid: false });
        return;
      }
      setValues({ ...values, emailInvalid: true });
    });
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, email: e.currentTarget.value });
  };
  return (
    <div className="flex justify-center items-center content-center">
      <div className="m-40 shadow p-8 flex-row rounded h-60">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col">
            <label className="text-sm font-ligth">E-mail</label>
            <input
              type="text"
              name="email"
              onChange={onChange}
              placeholder="ingresa tu email"
              className="border rounded px-4 py-1 text-sm mt-2 w-96"
            />
            <button
              type="submit"
              className="bg-green-400 text-white rounded text-sm py-1 mt-2"
            >
              Enviar
            </button>
            <div className="flex-col flex">
              {values.empty && (
                <span className="text-red-500 mt-2 text-sm font-normal">
                  Debes escribir tu email
                </span>
              )}
              {values.notEmail && (
                <span className="text-red-500 text-sm mt-2 font-normal">
                  Este no es un email valido
                </span>
              )}
              {values.emailOk && (
                <span className="text-blue-500 text-sm mt-2 font-normal">
                  Hemos enviado las instrucciones a seguir a tu email
                </span>
              )}
              {values.emailInvalid && (
                <span className="text-red-500 text-sm mt-2 font-normal">
                  Tu email es invalido
                </span>
              )}
            </div>
          </div>
        </form>
        <Link href="/auth">
          <span className="mt-8 cursor-pointer text-sm text-blue-500">Ir al inicio</span>
        </Link>
      </div>
    </div>
  );
};

export default index;
