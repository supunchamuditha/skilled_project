import { formToJSON } from "axios";
import { useState } from "react";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const register = async (FormData) => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/auth/registerUser", {
        method: "POST",
        body: FormData,
      });

      const data = await response.json();
      console.log(!!data.isVerified);
      if (response.ok) {
        setIsVerified(!data.isVerified);
        setMessage("Registration successful!");
      } else {
        console.error(data.message);
        setError("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error.response.data.message);
      setError("Error occurred while registering.");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, message, error, isVerified };
};

export const registerCompany = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const register = async (FormData) => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/auth/registerCompany", {
        method: "POST",
        body: FormData,
      });

      const data = await response.json();
      console.log(!!data.isVerified);
      if (response.ok) {
        setIsVerified(!data.isVerified);
        setMessage("Registration successful!");
      } else {
        console.error(data.message);
        setError("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error.response.data.message);
      setError("Error occurred while registering.");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, message, error, isVerified };
};
