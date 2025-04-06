"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface UserCredentials {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [credentials, setCredentials] = useState<UserCredentials>({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!credentials.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(credentials.email))
      newErrors.email = "Email is invalid";

    if (!credentials.password) newErrors.password = "Password is required";
    else if (credentials.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (activeTab === "signup") {
      if (!credentials.name) newErrors.name = "Name is required";
      if (credentials.password !== credentials.repeatPassword) {
        newErrors.repeatPassword = "Passwords don't match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (activeTab === "login") {
        const result = await signIn("credentials", {
          redirect: false,
          email: credentials.email,
          password: credentials.password,
        });

        if (result?.error) {
          setErrors({ form: result.error });
        } else {
          setIsOpen(false);
        }
      } else {
        // Handle signup logic here
        // You would typically call your signup API endpoint
        console.log("Signup data:", {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        });
        setIsOpen(false);
      }
    } catch (error) {
      setErrors({ form: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Buttons */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => {
            setActiveTab("login");
            setIsOpen(true);
          }}
          className="flex items-center space-x-1 text-pink-dark2 hover:text-white bg-pink-light hover:bg-pink-dark2 px-3 py-1.5 rounded-full transition-all duration-300 text-sm"
        >
          <span>Log In</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("signup");
            setIsOpen(true);
          }}
          className="flex items-center space-x-1 text-white bg-pink-dark2 hover:bg-pink-dark px-3 py-1.5 rounded-full transition-all duration-300 text-sm shadow-lg hover:shadow-pink-dark/30"
        >
          <span>Sign Up</span>
        </button>
      </div>

      {/* Modal */}
    </>
  );
};

export default AuthModal;
