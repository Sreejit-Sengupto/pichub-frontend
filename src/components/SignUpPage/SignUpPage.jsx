import React from "react";
import InputForm from "../../utils/InputForm";
import { redirect, Link } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

export async function loader() {
  try {
    const response = await axios.get(
      "https://pichub-backend-tlwt.onrender.com/api/v1/user/status",
      { withCredentials: true },
    );
    if (response) {
      return redirect("/home");
    }
  } catch (error) {
    return null;
  }
}

const SignUpPage = () => {
  return (
    <div className="w-[90%] lg:w-[30%] mx-auto h-[100dvh] flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-10">
        Welcome to <span className="text-primary">Pichub</span>
      </h1>
      <InputForm type={"register"} />
      <p>
        Already registered?
        <Link to={"/login"} className="ml-2 underline">
          Login now
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
