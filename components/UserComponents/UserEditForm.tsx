import React, { FormEvent, SetStateAction, useState } from "react";
import { Dispatch } from "react";
import { ChangeEvent } from "react";
import { toast } from "react-toastify";
import { UserDetail, UserEdit, UserEditErrors } from "../../interfaces/user";
import { editUser } from "../../services/user.service";
import { emptyData } from "../../utils/rules";

interface Props {
  detail: UserDetail | undefined;
  setReload: Dispatch<SetStateAction<boolean>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}
const UserEditForm = ({ detail, setReload, setShowModal }: Props) => {
  const [values, setValues] = useState<UserDetail>(defaultVal(detail));
  const [errors, setErrors] = useState<UserEditErrors>();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
    setErrors({ empty: false });
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: UserEdit = {
      nombre: values.nombre,
      apellido: values.apellido,
      telefono: values.telefono,
      direccion: values.direccion,
      id: values.id,
    };
    if (!emptyData(data)) {
      setErrors({ empty: true });
      return;
    }
    editUser(data)
      .then((res) => {
        if (res.ok) {
          setReload(true);
          setShowModal(false);
          toast.success("Se actualizo la informacion")
        }
      })
      .catch(() => {
        console.log("error");
      });
  };
  return (
    <div>
      <form className="form-horizontal w-max mx-auto" onSubmit={onSubmit}>
        {errors?.empty && (
          <span className="text-xs font-light text-red-500">
            No dejes campos vacios
          </span>
        )}
        <div className="flex flex-col mt-2">
          <label className="text-gray-600 text-xs">Nombre</label>
          <input
            id="nombre"
            type="text"
            className="flex-grow text-sm h-8 w-72 px-2 border rounded border-grey-400"
            name="nombre"
            defaultValue={values.nombre}
            placeholder="Escribe tu nombre"
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col mt-3">
          <label className="text-gray-600 text-xs">Apellido</label>
          <input
            id="apellido"
            type="text"
            className="flex-grow text-sm h-8 w-72 px-2 border rounded border-grey-400"
            name="apellido"
            defaultValue={values.apellido}
            placeholder="Escribe tu apellido"
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col mt-3">
          <label className="text-gray-600 text-xs">Telefono</label>
          <input
            id="telefono"
            type="text"
            className="flex-grow text-sm h-8 w-72 px-2 border rounded border-grey-400"
            name="telefono"
            defaultValue={values.telefono}
            placeholder="Escribe tu telefono"
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col mt-3">
          <label className="text-gray-600 text-xs">Direccion</label>
          <input
            id="direccion"
            type="text"
            className="flex-grow text-sm h-8 w-72 px-2 border rounded border-grey-400"
            name="direccion"
            defaultValue={values.direccion}
            placeholder="Escribe tu direccion"
            onChange={onChange}
          />
        </div>
        <button className="bg-blue-500 rounded-xl mt-3 px-8 text-sm text-white py-1">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default UserEditForm;

function defaultVal(data: UserDetail | undefined) {
  return {
    nombre: "" || data?.nombre,
    apellido: "" || data?.apellido,
    telefono: "" || data?.telefono,
    direccion: "" || data?.direccion,
    email: "" || data?.email,
    id: "" || data?.id,
    imagen: "" || data?.imagen,
  };
}
