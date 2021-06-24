import React from "react";
import { UserDetail } from "../../interfaces/user";

interface Props {
  info: UserDetail;
}

const UserInfo = ({ info }: Props) => {
  return (
    <ul className="pr-2 md:pr-28">
      <li className="font-semibold text-base mt-3">
        Nombre:<span className="text-sm font-light ml-1">{info.nombre}</span>
      </li>
      <li className="font-semibold text-base mt-3">
        Apellidos: <span className="text-sm font-light ml-1">{info.apellido}</span>
      </li>
      {info.telefono !== "" && (
        <li className="font-semibold text-base mt-3">
          Telefono: <span className="text-sm font-light ml-1">{info.telefono}</span>
        </li>
      )}
      {info.direccion !== "" && (
        <li className="font-semibold text-base mt-3">
          Direccion: <span className="text-sm font-light ml-1">{info.direccion}</span>
        </li>
      )}
      <li className="font-semibold text-base mt-3">
        E-mail: <span className="text-sm font-light ml-1">{info.email}</span>
      </li>
    </ul>
  );
};

export default UserInfo;
