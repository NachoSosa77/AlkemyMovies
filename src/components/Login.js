import React from "react";
import axios from "axios";
import swAlert from "@sweetalert/with-react";
import { useNavigate, Navigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === "" || password === "") {
      swAlert(<h2>Los campos no pueden estar vacios.</h2>);
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      swAlert(<h2>Credenciales inválidas.</h2>);
      return;
    }

    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        swAlert(<h2>¡Bienvenido!</h2>);
        console.log(res.data);
        const tokenRecibido = res.data.token;
        sessionStorage.setItem("token", tokenRecibido);
        navigate("/list");
      });
  };

  let token = sessionStorage.getItem('token');

  return (
    <>
      {token && <Navigate to="/list" />}
      
      <div className="container">
        <h2>Formulario de Login</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">
              <span>Correo electrónico</span>
              <input type="email" name="email" className="form-control" />
            </label>
          </div>

          <div className="mb-3">
            <label className="form-label">
              <span>Contraseña</span>
              <input type="password" name="password" className="form-control" />
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
