import React from "react";
import swAlert from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";

const Seeker = () => {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();

    if (keyword.length === 0) {
      swAlert(<h2>¡Tienes que escribir una palabra clave!</h2>);
    } else if (keyword.length < 4) {
      swAlert(<h2>¡Tienes que escribir más de 4 caracteres!</h2>);
    } else {
      e.currentTarget.keyword.value = "";
      navigate(`/results?seeker=${keyword}`);
    }
  };
  return (
    <>
      <form className="d-flex" onSubmit={submitHandler}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Buscador..."
          aria-label="Search"
          name="keyword"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default Seeker;
