import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Signup() {

  const navigate = useNavigate();

  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://gofood-steel.vercel.app/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });

    const json = await response.json()
    console.log(json);
    if(!json.success){
        alert("Enter Valid Credentials");
    }else {
      
      navigate("/login");
    }
    
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <div className="container d-flex maincontainer formimage">
        <img src="https://img.freepik.com/free-photo/view-tasty-food-arrangement-with-copy-space_23-2148859529.jpg?w=1060&t=st=1695304648~exp=1695305248~hmac=8de221da12b0dbaf1fbe2dcbe1baf3cfbfb94762346c6a319f321e0f87bd5e8e"></img>
      <div className="container mainbg w-60">
        <form
          className="w-70 mx-auto formbg roundedform"
          onSubmit={handleSubmit}
        >
          <div className='formhead text-center'>
            <h2 className='w-auto mx-auto text-white'>Sign up</h2>

          </div>
          <div className="m-3">
            <label htmlFor="name" className="form-label text-warning">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
            //   aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label text-warning">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
            //   aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label htmlFor="address" className="form-label text-warning">
              Address
            </label>
            <fieldset>
              <input
                type="text"
                className="form-control"
                name="geolocation"
                value={credentials.geolocation}
                onChange={onChange}
                // placeholder='"Click below for fetching address"'
                // aria-describedby="emailHelp"
              />
            </fieldset>
          </div>
          {/* <div className="m-3">
            <button
              type="button"
              name="geolocation"
              className=" btn btn-success"
            >
              Click for current Location
            </button>
          </div> */}
          <div className="m-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label text-warning"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className='buttoncss d-flex justify-content-center align-items-center'>
          <Link type="submit" className="m-3 btn btn-success" onClick={handleSubmit}>
            Submit
          </Link>
          <Link to="/login" className="m-3 mx-1 btn btn-danger">
            Already a user
          </Link>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
