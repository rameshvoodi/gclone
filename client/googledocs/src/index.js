import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "../src/pages/login";
import Register from "../src/pages/register";
import VerifyEmail from "../src/pages/user/verify-email";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import { ToastProvider } from "./contexts/toast-context";
import { DocumentProvider } from "./contexts/document-context";
import Document from "../src/pages/document/index";
import AuthRoute from "./components/molecules/auth-route";
import Create from "./pages/document/create";
import { EditorProvider } from "./contexts/editor-context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center justify-center min-h-screen space-x-4 w-full  gap-5">
                  <h1 className="text-3xl font-bold">
                    Google Docs Frontend Application
                  </h1>
                  <p className="text-center text-xl font-semibold">
                    Sign up for a account{" "}
                  </p>
                  <Link
                    to="/register"
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 w-full md:w-auto text-center"
                  >
                    Register
                  </Link>
                  <p className="mt-4 text-xl font-semibold">
                    Already signed up?
                  </p>
                  <Link
                    to="/login"
                    className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 w-full md:w-auto text-center"
                  >
                    Login
                  </Link>
                </div>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/verify-email/:token" element={<VerifyEmail />} />
            <Route
              path="/document/create"
              element={<AuthRoute element={<Create />} />}
            />
            <Route
              path="/document/:id"
              element={
                <AuthRoute
                  element={
                    <DocumentProvider>
                      <EditorProvider>
                        <Document />
                      </EditorProvider>
                    </DocumentProvider>
                  }
                />
              }
            />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
