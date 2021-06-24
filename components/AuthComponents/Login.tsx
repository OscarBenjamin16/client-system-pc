import { FocusEvent, useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { login } from "../../services/auth.service";
import { setToken } from "../../services/token.service";
import { Styles } from "../../utils/styles";

const  Login = ()=> {
  const [user, setUser] = useState(initialValues());
  const styles = new Styles();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = (e: FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.email !== "" && user.password !== "") {
      login(user)
        .then((res) => {
          console.log(res);
          if (res.token) {
            setToken(res.token);
            window.location.href = "/";
            return;
          }
          toast.error(res.message)
        })
        .catch(() => {
          console.log("error en todo xDxD");
        });
    }
  };
  return (
    <form
      className="form-horizontal w-3/4 mx-auto"
      method="POST"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col mt-4">
        <label className="text-gray-600 uppercase" style={styles.font}>
          EMAIL
        </label>
        <input
          id="email"
          type="text"
          className="flex-grow text-sm h-8 px-2 border rounded border-grey-400"
          name="email"
          defaultValue=""
          placeholder="Email"
          onChange={onChange}
        />
      </div>
      <div className="flex flex-col mt-4">
        <label className="text-gray-600 uppercase" style={styles.font}>
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          className="flex-grow text-sm h-8 px-2 rounded border border-grey-400"
          name="password"
          required
          placeholder="Password"
          onChange={onChange}
        />
      </div>
      <div className="flex flex-col mt-8">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded"
        >
          Iniciar Sesion
        </button>
      </div>
    </form>
  );
}

export default Login;

function initialValues() {
  return {
    email: "",
    password: "",
  };
}
