import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function IsOk() {
  return (
    <>
      <div
        className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center"
        style={{ background: "rgba(0, 0, 0, 0.3)" }}
      >
        <div className="bg-white border py-2 px-5 rounded-lg flex items-center">
          <div className="text-gray-500 text-md font-semibold text-center">
            La cuenta se activo con exito
          </div>
          <div className="loader-dots block relative ml-4">
            <FontAwesomeIcon
              icon={faCheck}
              className="animate-pulse text-green-500"
            />
          </div>
        </div>
      </div>
    </>
  );
}
