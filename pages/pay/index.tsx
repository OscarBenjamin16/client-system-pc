import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import { checkPayment, clearCart } from "../../services/cart.service";
import Loading from "../../components/GlobalComponents/Loading";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const { query } = router;
  const { PayerID, paymentId, token,code } = query;
  const socket = io("https://systempcs.herokuapp.com");
  socket.on("connect", () => {});
  const checkPay = () => {
    if (typeof paymentId !== "undefined") {
      checkPayment(String(PayerID), String(paymentId), String(token),String(code))
        .then((res) => {
          if(res.ok){
            socket.emit("new", "A new order is added");
            setLoading(false)
            clearCart()
            router.push('/catalog')
            toast.success(res.message)
          }
        })
        .catch(() => {
          toast.error("Error en el servidor")
        });
    }
  };
  useEffect(() => {
    return checkPay();
  }, [query]);
  return <div>
      {loading && <Loading/>}
  </div>;
};

export default index;
