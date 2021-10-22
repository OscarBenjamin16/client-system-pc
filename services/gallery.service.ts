import { SERVER_API } from "../utils/constants";
import { getToken } from "./token.service";

export const getPhotos = async (id: number | undefined) => {
  const response = await fetch(
    `${SERVER_API}/gallery/mostrar-gallery-product/${id}`,
    {
      headers: { token: `Bearer:${getToken()}` },
    }
  );
  return response.json();
};
