import React from "react";
import axios from "axios";
import { Link, redirect } from "react-router-dom";

export async function loader() {
  try {
    const response = await axios.get(
      "https://pichub-backend-tlwt.onrender.com/api/v1/user/status",
    );
    if (response) {
      return redirect("/home");
    }
  } catch (error) {
    return null;
  }
}

const LandingPage = () => {
  return (
    <div>
      Welcome to Pichub
      <Link to={"/login"}>Login</Link>
      <Link to={"/register"}>Register</Link>
    </div>
  );
};

export default LandingPage;
