import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  const{showAlert}=props;
  const history = useHistory();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const host = "https://i-notebok-main-5g9b4qaxa-avinash-sorojs-projects.vercel.app";
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    // save the auth token and redirect

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      history.push("/");
      showAlert("Signed In successfully","success")

    } else {
      showAlert("Invalid Credentials","danger")

    }
  };
  const onChange = (e) => {
    e.preventDefault();
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container " style={{ margin:"5rem"}}>
      <form className="container " onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            id="name"
            name="name"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={onChange}
            name="password"
            id="password"
            required
          />
        </div>
        <div className="mb-3">
          <label for="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={onChange}
            name="cpassword"
            id="cpassword"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
