import { useState, useCallback, Dispatch, SetStateAction } from "react";
import { showImageClient } from "../../services/client.service";
import { useDropzone } from "react-dropzone";
import { UserDetail } from "../../interfaces/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { addUserImage } from "../../services/user.service";
import { toast } from "react-toastify";

interface Props {
  info: UserDetail;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const UserImage = ({ info, setReload }: Props) => {
  const [user_file, setUser_file] = useState<File>();
  const [user_image, setUser_image] = useState<string | undefined>(
    info?.imagen && showImageClient(info.imagen)
  );
  const onDropImage = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    console.log(file);
    setUser_image(URL.createObjectURL(file));
    setUser_file(file);
  }, []);
  const {
    getRootProps: getRootImgProps,
    getInputProps: getInputImgProps,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropImage,
  });

  const addImage = () => {
    user_file &&
      info.id &&
      addUserImage(user_file, info.id).then((res) => {
        if (res.ok) {
          setReload(true);
          toast.success("Se guardo la imagen con exito")
        }
      });
  };
  return (
    <>
      <div
        className="cursor-pointer overflow-hidden"
        {...getRootImgProps()}
      >
        <img src={user_image ? user_image : ""} className="overflow-hidden" style={{borderRadius:'50%',width:'16rem',height:'16rem'}} />
        <input {...getInputImgProps()} type="file" className="hidden" />
      </div>
      {user_file && (
        <button
          onClick={addImage}
          className="px-12 mt-4 ml-8 rounded-xl py-1 bg-indigo-500 text-white font-semibold text-sm"
        >
          <FontAwesomeIcon icon={faSave} /> Guardar
        </button>
      )}
    </>
  );
};

export default UserImage;
