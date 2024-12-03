import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";

  
const Login = (props) => {
const{showAlert}=props;
  const history = useHistory();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const host = "http://localhost:5000/";
  useEffect(() => {
    setCredentials({ email: "", password: "" });
  }, ["/login"]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const response = await fetch(`${host}api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the auth token and redirect
      
      localStorage.setItem("token", json.authToken);
            setCredentials({ email: "", password: "" }); // Clear form after login

      
      history.push("/");
      showAlert("Logged In successfully","success")
    }
    else{
       showAlert("Invalid Credentials","danger")
    }
  };
  const onChange = (e) => {
    e.preventDefault();
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      <form className="container  " onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            onChange={onChange}
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            autoComplete="off"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={onChange}
            value={credentials.password}
            name="password"
            id="password"
            autoComplete="off"

          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
