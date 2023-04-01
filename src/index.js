import React from "react";
import ReactDOM from "react-dom/client";
import { lazy, Suspense } from "react";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/js/all.js";
import MenuProvider from "./Context/menuContext";
import UserProvider from "./Context/UserContext";
import LoadingWebsite from "./Components/Loading/LoadingWebsite";
const App = lazy(() => import("./App.js"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <MenuProvider>
        <Router>
          <Suspense
            fallback={
              <div>
                <LoadingWebsite />{" "}
              </div>
            }
          >
            <App />
          </Suspense>
        </Router>
      </MenuProvider>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
