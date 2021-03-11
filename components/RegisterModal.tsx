import React, { SetStateAction, useState } from "react";
import { Styles } from "../utils/styles";
import { Validation } from "../utils/validations";
import { errorsValues } from "../interfaces/user";
import { register } from "../services/auth.service";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}

export default function Modal({ showModal, setShowModal }: Props) {
  const styles = new Styles();
  const rules = new Validation();
  const [user, setUser] = useState(initialValues());
  const [errors, setErrors] = useState(errorsInitial());
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors(errorsInitial());
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rules.isEmptyForm(user)) {
      if (rules.isEmail(user)) {
        if (rules.isSecurePassword(user)) {
          if (rules.isSamePassword(user)) {
            register(user)
              .then((res) => {
                if(res.code === 400){
                  alert("EMAIL IN USE")
                }else{
                  alert("Se creo")
                  setShowModal(false)
                  setUser(initialValues())
                }
              })
              .catch(() => {
                console.log("error en todo XD");
              });
          } else {
            const err: errorsValues = { ...errors, rePassword: true };
            setErrors(err);
          }
        } else {
          const err: errorsValues = { ...errors, password: true };
          setErrors(err);
        }
      } else {
        const err: errorsValues = { ...errors, email: true };
        setErrors(err);
      }
    } else {
      const err: errorsValues = { ...errors, empty: true };
      setErrors(err);
    }
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="font-semibold text-lg">
                    Crea una cuenta nueva
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" overflow-hidden bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form
                    className="form-horizontal w-max mx-auto"
                    method="POST"
                    onSubmit={onSubmit}
                  >
                    <div className="flex flex-col">
                      {errors.empty && (
                        <span className="text-xs text-red-600">
                          No dejes campos vacios
                        </span>
                      )}
                      <label
                        className="text-gray-600 uppercase"
                        style={styles.font}
                      >
                        NOMBRE
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        className="flex-grow text-xs h-8 w-64 px-2 border rounded border-grey-400"
                        name="nombre"
                        defaultValue=""
                        placeholder="Escribe tu nombre"
                        onChange={onChange}
                      />
                    </div>
                    <div className="flex flex-col mt-4">
                      <label
                        className="text-gray-600 uppercase"
                        style={styles.font}
                      >
                        APELLIDO
                      </label>
                      <input
                        id="apellido"
                        type="text"
                        className="flex-grow text-xs h-8 w-64 px-2 border rounded border-grey-400"
                        name="apellido"
                        defaultValue=""
                        placeholder="Escribe tu apellido"
                        onChange={onChange}
                      />
                    </div>
                    <div className="flex flex-col mt-4">
                      <label
                        className="text-gray-600 uppercase"
                        style={styles.font}
                      >
                        EMAIL
                      </label>
                      <input
                        id="email"
                        type="text"
                        className="flex-grow text-xs h-8 w-64 px-2 border rounded border-grey-400"
                        name="email"
                        defaultValue=""
                        placeholder="Escribe tu email"
                        onChange={onChange}
                      />
                      {errors.email && (
                        <span className="text-sm text-red-600">
                          Email invalido
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col mt-4">
                      <label
                        className="text-gray-600 uppercase"
                        style={styles.font}
                      >
                        PASSWORD
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="flex-grow text-xs h-8 px-2 rounded border border-grey-400"
                        name="password"
                        required
                        placeholder="Escribe tu password"
                        onChange={onChange}
                      />
                      {errors.password && (
                        <span className="text-sm text-red-600">
                          Las contrasena es insegura
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col mt-4">
                      <label
                        className="text-gray-600 uppercase"
                        style={styles.font}
                      >
                        REPITE TU PASSWORD
                      </label>
                      <input
                        id="rePassword"
                        type="password"
                        className="flex-grow text-xs h-8 px-2 rounded border border-grey-400"
                        name="rePassword"
                        required
                        placeholder="Escribe de nuevo tu password"
                        onChange={onChange}
                      />
                      {errors.rePassword && (
                        <span className="text-sm text-red-600">
                          Las contrasenas no coinciden
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col mt-8">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded"
                      >
                        Registrarse
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed opacity-50 inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

function initialValues() {
  return {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    rePassword: "",
  };
}
function errorsInitial() {
  return {
    nombre: false,
    apellido: false,
    email: false,
    password: false,
    rePassword: false,
    empty: false,
  };
}
