import React, { useState } from "react";
import { Link } from "react-router-dom";
import UseSignup from "../../hooks/useSignup.js";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { loading, signup } = UseSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(input);
  };
  return (
    <div className="flex justify-center items-center flex-col min-w-96 mx-auto">
      <div
        className="w-full p-6 rounded-lg shadow-md bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-lg
   bg-opacity-20"
      >
        <h1 className="text-3xl font-semibold text-center text-gray-900">
          SignUp
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-lg label-text text-gray-700 ">
                Fullname
              </span>
            </label>
            <input
              type="text"
              value={input.fullname}
              onChange={(e) => setInput({ ...input, fullname: e.target.value })}
              placeholder="Fullname"
              className="p-2 w-full input input-bordered text-gray-300 h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-lg label-text text-gray-700 ">
                Username
              </span>
            </label>
            <input
              type="text"
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
              placeholder="username"
              className="p-2 w-full input input-bordered text-gray-300 h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-lg label-text text-gray-700 ">
                Password
              </span>
            </label>
            <input
              type="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              placeholder="password"
              className="p-2 w-full input input-bordered text-gray-300 h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-lg label-text text-gray-700 ">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              value={input.confirmPassword}
              onChange={(e) =>
                setInput({ ...input, confirmPassword: e.target.value })
              }
              placeholder="password"
              className="p-2 w-full input input-bordered text-gray-300 h-10"
            />
          </div>
          <Link to={"/login"} className="text-zinc-700">
            Already have an account?{" "}
            <span className="text-zinc-800 hover:cursor-pointer">Login</span>
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
