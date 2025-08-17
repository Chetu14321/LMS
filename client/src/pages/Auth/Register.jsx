import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../../Context/ThemeContex";

export default function Register() {
  const { theme } = useTheme();
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const navigate = useNavigate();

  const readInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("user", user);
      await axios
        .post(`/api/auth/register`, user)
        .then((res) => {
          toast.success(res.data.msg);
          navigate("/login");
        })
        .catch((err) => toast.error(err.response.data.msg));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div
      className={theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}
      style={{ minHeight: "100vh" }} // full height
    >
      <div className="container">
        <div className="row justify-content-center">
          {/* Added mt-5 to push it down */}
          <div className="col-md-6 mt-5">
            <div
              className={`card shadow-lg ${
                theme === "dark" ? "bg-secondary text-light" : "bg-white"
              }`}
            >
              <div className="card-header text-center">
                <h3 className="fw-bold text-primary">Register</h3>
              </div>
              <div className="card-body">
                <form onSubmit={submitHandler}>
                  <div className="form-group mt-3">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter Name"
                      value={user.name}
                      onChange={readInput}
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="email">Your Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                      value={user.email}
                      onChange={readInput}
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="mobile">Your Mobile</label>
                    <input
                      type="text"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                      placeholder="Enter Mobile"
                      value={user.mobile}
                      onChange={readInput}
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="password">Your Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                      value={user.password}
                      onChange={readInput}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                    <input
                      type="submit"
                      value="Register"
                      className="btn btn-success"
                    />
                    <input
                      type="reset"
                      value="Clear"
                      className="btn btn-warning"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
