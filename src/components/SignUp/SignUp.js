import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import Logo from "../../images/logo2.png";
import "./SignUp.css";
import { useAuth } from "../SignUp/useAuth";

const SignUp = ({ login }) => {
  const [returningUser, setReturningUser] = useState(login);
  const { register, handleSubmit, watch, errors } = useForm();

  const auth = useAuth();

  const onSubmit = (data) => {
    console.log(auth);

    console.log(auth.user);
    if (returningUser) {
      auth.signIn(data);
    } else {
      auth.signUp(data);
    }
  };

  return (
    <div className="sign-up">
      {localStorage.getItem("authToken_foodie") ? (
        <Redirect to="/" />
      ) : (
        <div className="container">
          <div className="logo text-center py-4">
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
          </div>
          {returningUser ? (
            <form onSubmit={handleSubmit(onSubmit)} className="py-3">
              <h1 className="lead text-center py-3">Welcome back!</h1>
              {/* {auth.user != null && (
              <p className="text-danger">* {auth.user.error}</p>
            )} */}

              <div className="form-group">
                <input
                  name="email"
                  className="form-control"
                  ref={register({ required: true })}
                  placeholder="admin@admin.com"
                  value="admin@admin.com"
                />
                {errors.email && (
                  <span className="error">Email is required</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  ref={register({ required: true })}
                  placeholder="1Qwertyu"
                  value="1Qwertyu"
                />
                {errors.password && (
                  <span className="error">Password is required</span>
                )}
              </div>

              <div className="form-group">
                <button className="btn btn-danger btn-block" type="submit">
                  Sign In
                </button>
              </div>

              <div className="text-center my-0">
                <label> or </label>
              </div>

              <button
                className="btn btn-success  btn-block"
                // onClick={auth.signInWithGoogle}
              >
                Sign in with Google
              </button>
              <div className="option text-center my-3">
                <label onClick={() => setReturningUser(false)}>
                  Create a new Account
                </label>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="py-5">
              {/* {auth.user != null && (
              <p className="text-danger">* {auth.user.error}</p>
            )} */}

              <div className="form-group">
                <input
                  name="firstName"
                  className="form-control"
                  ref={register({
                    required: "First name is required",
                  })}
                  placeholder="First Name"
                />
              </div>

              <div className="form-group">
                <input
                  name="lastName"
                  className="form-control"
                  ref={register({
                    required: "Last name is required",
                  })}
                  placeholder="Last Name"
                />
              </div>

              <div className="form-group">
                <input
                  name="email"
                  className="form-control"
                  ref={register({
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Email"
                />
                <span className="error">
                  {errors.email && errors.email.message}
                </span>
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  ref={register({
                    // required: "Password is required",
                    // pattern: {
                    //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i,
                    //     message:
                    //         "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
                    // },
                  })}
                  placeholder="Password"
                />
                <span className="error">
                  {errors.password && errors.password.message}
                </span>
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  // ref={register({
                  //     validate: (value) => value === watch("password"),
                  // })}
                  placeholder="Confirm Password"
                />
                {/* {errors.confirm_password && (
                                <span className="error">Passwords don't match.</span>
                            )} */}
              </div>

              <div className="form-group">
                <button className="btn btn-danger btn-block" type="submit">
                  Sign Up
                </button>
              </div>

              <div className="option text-center my-3">
                <label onClick={() => setReturningUser(true)}>
                  Already Have an Account
                </label>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default SignUp;
