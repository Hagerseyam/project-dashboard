"use client";

import "../styles/globals.css";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Provider */}
        <Provider store={store}>
          {children}
        </Provider>

        {/* Toastify container for the notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light" aria-label={undefined} />
      </body>
    </html>
  );
}
