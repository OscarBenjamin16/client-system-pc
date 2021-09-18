import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import { checkPayment, clearCart } from "../../services/cart.service";
import Loading from "../../components/GlobalComponents/Loading";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../../utils/constants";

const index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { query } = router;
  const { PayerID, paymentId, token, CODIGO_CUPON } = query;
  const serverURL = SOCKET_URL;
  const socket = useMemo(
    () =>
      io(serverURL, {
        transports: ["websocket"],
      }),
    [serverURL]
  );

  useEffect(() => {
    socket.on("connect", () => {});
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {});
  }, [socket]);

  const callSocket = useCallback(() => {
    socket.emit("new", "A new order is added");
  }, [socket]);

  const checkPay = () => {
    if (typeof paymentId !== "undefined") {
      checkPayment(
        String(PayerID),
        String(paymentId),
        String(token),
        CODIGO_CUPON ? String(CODIGO_CUPON) : ""
      )
        .then((res) => {
          if (res.ok) {
            callSocket();
            setLoading(false);
            clearCart();
            router.push("/catalog");
            toast.success(res.message);
          }
        })
        .catch(() => {
          toast.error("Error en el servidor");
        });
    }
  };
  useEffect(() => {
    return checkPay();
  }, [query]);
  return <div>{loading && <Loading />}</div>;
};

export default index;
