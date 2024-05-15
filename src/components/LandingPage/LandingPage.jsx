import React from "react";
import axios from "axios";
import { redirect } from "react-router-dom";

export async function loader() {
  try {
    const response = await axios.get("/api/v1/user/status");
    if (response) {
      return redirect("/home");
    }
  } catch (error) {
    return null;
  }
}

const LandingPage = () => {
  return <div>LandingPage</div>;
};

export default LandingPage;
