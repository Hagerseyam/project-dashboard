"use client";

import "../styles/globals.css";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Keep Redux Provider */}
        <Provider store={store}>
          {children}
        </Provider>

        {/* Toastify container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light" aria-label={undefined}        />
      </body>
    </html>
  );
}
