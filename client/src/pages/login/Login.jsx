import React, { useState } from "react";
import { Link } from "react-router-dom";
import UseLogin from "../../hooks/useLogin";

function Login() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const {loading,login} = UseLogin();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    await login(input);
  }

  return (
    <div className="flex justify-center items-center flex-col min-w-96 mx-auto">
      <div
        className="w-full p-6 rounded-lg shadow-md bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-lg
 bg-opacity-20"
      >
        <h1 className="text-3xl font-semibold text-center text-gray-900">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-lg label-text text-gray-700 ">
                Username
              </span>
            </label>
            <input
              value={input.username}
              onChange={(e) => {
                setInput({ ...input, username: e.target.value });
              }}
              type="text"
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
              value={input.password}
              onChange={(e) => {
                setInput({ ...input, password: e.target.value });
              }}
              type="password"
              placeholder="password"
              className="p-2 w-full input input-bordered text-gray-300 h-10"
            />
          </div>
          <Link to={"/signup"} className="text-zinc-700">
            Don't have account?{" "}
            <span className="text-zinc-800 hover:cursor-pointer">SignUp</span>
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
            {loading ? <span className=" loading loading-spinner "></span> :"Login"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
