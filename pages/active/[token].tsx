import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import jwt from "jwt-decode";
import { confirmAccount } from "../../services/auth.service";
import Loading from "../../components/GlobalComponents/Loading";
import Waiting from "../../components/ConfirmComponents/Waiting";
import IsOk from "../../components/ConfirmComponents/IsOk";

export default function Comfirm() {
  const router = useRouter();
  const { token } = router.query;
  const [tokenInfo, settokenInfo] = useState<{} | undefined>();
  const [isActive, setisActive] = useState(false);
  const setTokenToSate = () => {
    try {
      if (token) {
        settokenInfo(token && jwt(String(token)));
      }
    } catch (error) {
      router.push("/404");
    }
  };
  const readyForComfirm = () => {
    setTimeout(() => {
      confirmAccount(String(token))
        .then((res) => {
          if (res.ok) {
            setisActive(true);
            setTimeout(() => {
              router.push("/auth");
            }, 2000);
          }
        })
        .catch(() => {
          console.log("error en los datos");
        });
    }, 2000);
  };
  useEffect(() => {
    setTokenToSate();
    return;
  }, [token]);
  useEffect(() => {
    if (tokenInfo) {
      readyForComfirm();
    }
    return;
  }, [tokenInfo]);
  return (
    <div>
      {typeof token === "undefined" ? (
        <Loading />
      ) : (
        <>{tokenInfo && <>{!isActive ? <Waiting /> : <IsOk />}</>}</>
      )}
    </div>
  );
}
