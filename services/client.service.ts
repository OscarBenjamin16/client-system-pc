import { SERVER_API } from "../utils/constants";

export function showImageClient(name: string | undefined) {
    return `${SERVER_API}/user/image?image=${name}`
}