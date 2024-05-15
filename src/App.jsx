import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import LoginPage, {
  loader as loginLoader,
} from "@/components/LoginPage/LoginPage";

import SignUpPage from "@/components/SignUpPage/SignUpPage";
import Home, { loader as homeLoader } from "@/components/Home/Home";
import Gallery, {
  loader as galleryLoader,
} from "./components/Home/Gallery/Gallery";
import LandingPage, {
  loader as landigPageLoader,
} from "./components/LandingPage/LandingPage";
import Layout, { loader as layoutLoader } from "./components/Layout/Layout";
// import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route
        path="/login"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route index element={<Home />} />
        <Route path="gallery" element={<Gallery />} />
      </Route> */}
      <Route path="/" element={<LandingPage />} loader={landigPageLoader} />

      <Route path="/home" element={<Layout />} loader={layoutLoader}>
        <Route index element={<Home />} loader={homeLoader} />
        <Route path=":gallery" element={<Gallery />} loader={galleryLoader} />
      </Route>

      <Route path="login" element={<LoginPage />} loader={loginLoader} />
      <Route path="register" element={<SignUpPage />} />
    </>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

function delayForDemo(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  }).then(() => promise);
}

export default App;
