import React from "react";
import InputForm from "../../utils/InputForm";
import axios from "axios";
axios.defaults.withCredentials = true;
import { Link, redirect, useParams, useSearchParams } from "react-router-dom";

export async function loader() {
  try {
    const response = await axios.get(
      "https://pichub-backend-tlwt.onrender.com/api/v1/user/status",
      { withCredentials: true },
    );
    if (response) {
      return redirect("/home");
    } else {
      await axios.post(
        "https://pichub-backend-tlwt.onrender.com/api/v1/user/refresh-tokens",
        {},
        { withCredentials: true },
      );
      return redirect("/home");
    }
  } catch (error) {
    return null;
  }
}

const LoginPage = () => {
  return (
    <div className="w-[90%] lg:w-[30%] mx-auto h-[100dvh] flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-10">
        Welcome <span className="text-primary">Back</span>
      </h1>
      <InputForm type={"login"} />
      <p>
        Not registered yet?
        <Link to={"/register"} className="ml-2 underline">
          Register now
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
