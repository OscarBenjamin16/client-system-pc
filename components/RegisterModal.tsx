import React, { SetStateAction } from "react";
import { register } from "../services/auth.service";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}
interface Register{
  nombre: string,
    apellido: string,
    email: string,
    password: string,
    rePassword: string,
}
export default function Modal({ showModal, setShowModal }: Props) {
  const onSubmit = (values:Register) => {
    register(values).then(res=>{
      if(res.ok){
        toast.success(res.message)
        setShowModal(false)
        return;
      }
      toast.error(res.message)
    })
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
                  <Formik
                    initialValues={initialValues()}
                    onSubmit={(fields) => onSubmit(fields)}
                    validationSchema={Yup.object().shape({
                      nombre: Yup.string().required("El nombre es requerido"),
                      apellido: Yup.string().required("El apellido es requerido"),
                      email:Yup.string().email("Direccion de correo invalida").required("El email es requerido"),
                      password: Yup.string()
                        .min(8, "La contraseña debe contener al menos 8 caracteres")
                        .required("La contraseña es requerida"),
                      rePassword: Yup.string()
                        .oneOf([
                          Yup.ref("password"),null],
                          "Las contraseñas deben ser iguales",
                        )
                        .required("Debes confirmar tu contraseña"),
                    })}
                  >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="w-72">
                        <label className="text-xs">Nombre</label>
                        <Field
                          name="nombre"
                          placeholder="Ingresa tu nombre"
                          className={
                            "text-gray-500 border w-full outline-none focus:outline-none rounded-sm px-2 text-xs py-1 mt-2" +
                            (errors.nombre && touched.nombre
                              ? " border-red-500"
                              : " border-gray-300")
                          }
                        />
                      </div>
                      {errors.nombre && (
                      <ErrorMessage
                        name="nombre"
                        component="span"
                        className="text-red-400 font-small"
                      />
                    )}
                       <div className="w-72">
                        <label className="text-xs">Apellido</label>
                        <Field
                          name="apellido"
                          placeholder="Ingresa tu apellido"
                          className={
                            "text-gray-500 border w-full outline-none focus:outline-none rounded-sm px-2 text-xs py-1 mt-2" +
                            (errors.apellido && touched.apellido
                              ? " border-red-500"
                              : " border-gray-300")
                          }
                        />
                      </div>
                      {errors.apellido && (
                      <ErrorMessage
                        name="apellido"
                        component="span"
                        className="text-red-400 font-small"
                      />
                    )}
                      <div className="w-72">
                        <label className="text-xs">E-mail</label>
                        <Field
                          name="email"
                          placeholder="Ingresa tu email"
                          className={
                            "text-gray-500 border w-full outline-none focus:outline-none rounded-sm px-2 text-xs py-1 mt-2" +
                            (errors.email && touched.email
                              ? " border-red-500"
                              : " border-gray-300")
                          }
                        />
                      </div>
                      {errors.email && (
                      <ErrorMessage
                        name="email"
                        component="span"
                        className="text-red-400 font-small"
                      />
                    )}
                      <div className="w-72">
                        <label className="text-xs">Password</label>
                        <Field
                          name="password"
                          type="password"
                          placeholder="Ingresa tu password"
                          className={
                            "text-gray-500 border w-full outline-none focus:outline-none rounded-sm px-2 text-xs py-1 mt-2" +
                            (errors.password && touched.password
                              ? " border-red-500"
                              : " border-gray-300")
                          }
                        />
                      </div>
                      {errors.password && (
                      <ErrorMessage
                        name="password"
                        component="span"
                        className="text-red-400 font-small"
                      />
                    )}
                       <div className="w-72">
                        <label className="text-xs">Repite tu password
                        </label>
                        <Field
                          name="rePassword"
                          type="password"
                          placeholder="repite tu password"
                          className={
                            "text-gray-500 border w-full outline-none focus:outline-none rounded-sm px-2 text-xs py-1 mt-2" +
                            (errors.rePassword && touched.rePassword
                              ? " border-red-500"
                              : " border-gray-300")
                          }
                        />
                      </div>
                      {errors.rePassword && (
                      <ErrorMessage
                        name="rePassword"
                        component="span"
                        className="text-red-400 font-small"
                      />
                    )}
                      <button
                        type="submit"
                        className="w-full mt-4 bg-blue-500 rounded-md text-sm md:text-md p-1 font-semibold text-white"
                      >
                        Registrar
                      </button>
                    </Form>
                  )}
                  </Formik>
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

