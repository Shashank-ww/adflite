"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

import Toast from "../layout/Toast";

type ToastContextType = {
  showToast: (
    message: string
  ) => void;
};

const ToastContext =
  createContext<ToastContextType | null>(
    null
  );

export function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [message, setMessage] =
    useState("");

  const [show, setShow] =
    useState(false);

  const showToast = (
    message: string
  ) => {

    console.log(
      "SHOW TOAST:",
      message
    );

    setMessage(message);

    setShow(true);
  };

  return (
    <ToastContext.Provider
      value={{ showToast }}
    >

      {children}

      <Toast
        message={message}
        show={show}
        onClose={() =>
          setShow(false)
        }
      />

    </ToastContext.Provider>
  );
}

export function useToast() {
  const context =
    useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast must be used inside ToastProvider"
    );
  }

  return context;
}