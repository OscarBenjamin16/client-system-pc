import React from "react";
import Layout from "../../components/Layout";
import { Styles } from "../../utils/styles";
import RegisterModal from "../../components/RegisterModal";
import { login } from "../../services/auth.service";
import Router from "next/router";
import { setToken } from "../../services/token.service";

const auth = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [user, setUser] = React.useState(initialValues())
  const styles = new Styles();
  const onSubmit = (e:React.FocusEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(user.email !== "" && user.password !== ""){
      login(user).then(res =>{
        if(res.token){
          setToken(res.token)
          Router.push('/')
        }
      }).catch(()=>{
        console.log("error en todo xDxD")
      })
    }
  }
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setUser({...user,[e.target.name]:e.target.value})
  }
  return (
    <Layout>
      <div className="h-full w-full mt-16 pt-12 pb-12">
        <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
          <div className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0">
            <div className="flex flex-col w-full md:w-1/2 p-4">
              <div className="flex flex-col flex-1 justify-center mb-8">
                <h1 className="text-4xl text-center font-thin overflow-hidden">Bienvenido!!</h1>
                <div className="w-full mt-4">
                  <form
                    className="form-horizontal w-3/4 mx-auto"
                    method="POST"
                    onSubmit={onSubmit}
                  >
                    <div className="flex flex-col mt-4">
                      <label
                        className="text-gray-600 uppercase"
                        style={styles.font}
                      >
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
                      <label
                        className="text-gray-600 uppercase"
                        style={styles.font}
                      >
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
                  <div className="text-center mt-4">
                    <a
                      className="no-underline hover:underline text-blue-dark text-xs"
                      href="{{ route('password.request') }}"
                    >
                      Olvidaste tu contrasenia
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="hidden md:block md:w-1/2 rounded-r-lg"
              style={styles.image}
            ></div>
          </div>
        </div>
      </div>
      <p className="text-center mt-4 mb-8">
        Aun no tienes una cuenta?{" "}
        <span
          onClick={() => setShowModal(true)}
          className="font-semibold cursor-pointer text-indigo-600"
        >
          REGISTRATE
        </span>
      </p>
      <RegisterModal showModal={showModal} setShowModal={setShowModal} />
    </Layout>
  );
};

export default auth;

function initialValues(){
  return {
    email:"",
    password:""
  }
}