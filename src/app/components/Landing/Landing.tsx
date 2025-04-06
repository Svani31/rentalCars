"use client";
import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import { useStore } from "@/app/utils/context/UserContext";

interface UserCredentials {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [credentials, setCredentials] = useState<UserCredentials>({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const { user } = useStore();

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setErrors({ form: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-pink-dark2 bg-pink-dark px-4 py-2 rounded-full transform hover:scale-105 transition-transform duration-200 active:scale-95">
              Es Georgia
            </h1>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-pink-dark2 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <CloseIcon fontSize="large" />
            ) : (
              <MenuIcon fontSize="large" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <a
              href="#"
              className="text-pink-dark2 hover:text-white px-3 py-1.5 lg:px-4 lg:py-2 bg-pink-dark rounded-full transition-all duration-300 hover:bg-pink-dark2 font-medium text-sm lg:text-base"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-pink-dark2 transition-colors duration-300 font-medium text-sm lg:text-base"
            >
              Services
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-pink-dark2 transition-colors duration-300 font-medium text-sm lg:text-base"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-pink-dark2 transition-colors duration-300 font-medium text-sm lg:text-base"
            >
              Contact
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <button
              onClick={() => {
                setActiveTab("login");
                setIsOpen(true);
                console.log("this is is Open");
              }}
              className="select-none  flex items-center space-x-1 text-pink-dark2 hover:text-white bg-pink-light hover:bg-pink-dark2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full transition-all duration-300 font-medium text-sm lg:text-base active:scale-95"
            >
              <LoginIcon className="text-lg" />
              <span>Log In</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("signup");
                setIsOpen(true);
              }}
              className="flex items-center space-x-1 text-white bg-pink-dark2 hover:bg-pink-dark px-3 py-1.5 lg:px-4 lg:py-2 rounded-full transition-all duration-300 font-medium shadow-lg hover:shadow-pink-dark/30 text-sm lg:text-base active:scale-95 select-none "
            >
              <AccountCircleIcon className="text-lg" />
              <span>Sign Up</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-96 py-2" : "max-h-0 py-0"
        }`}
      >
        <div className="px-4 flex flex-col space-y-3">
          <a
            href="#"
            className="text-pink-dark2 py-2 border-b border-gray-100 font-medium"
            // onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-600 py-2 border-b border-gray-100"
            // onClick={() => setMobileMenuOpen(false)}
          >
            Services
          </a>
          <a
            href="#"
            className="text-gray-600 py-2 border-b border-gray-100"
            // onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-600 py-2"
            // onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
          <div className="flex space-x-4 pt-2 pb-3">
            <button
              className="flex-1 flex items-center justify-center space-x-1 text-pink-dark2 border border-pink-dark2 rounded-full py-2 text-sm active:scale-95"
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveTab("login");
                setIsOpen(true);
              }}
            >
              <LoginIcon fontSize="small" />
              <span>Log In</span>
            </button>
            <button
              className="flex-1 flex items-center justify-center space-x-1 text-white bg-pink-dark2 rounded-full py-2 text-sm active:scale-95"
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveTab("signup");
                setIsOpen(true);
              }}
            >
              <AccountCircleIcon fontSize="small" />
              <span>Sign Up</span>
            </button>
          </div>
        </div>
      </div>
      <Transition show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-50 "
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all sm:w-40 md:w-56 lg:w-72 xl:w-96">
                  <div className="flex justify-between items-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-pink-dark2"
                    >
                      {activeTab === "login" ? "Log In" : "Sign Up"}
                    </Dialog.Title>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-pink-dark2"
                      onClick={() => setIsOpen(false)}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {errors.form && (
                    <div className="mt-2 text-sm text-red-600">
                      {errors.form}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    {activeTab === "signup" && (
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={credentials.name}
                          onChange={handleChange}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-dark2 focus:ring focus:ring-pink-dark2 focus:ring-opacity-50 ${
                            errors.name ? "border-red-500" : ""
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.name}
                          </p>
                        )}
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-dark2 focus:ring focus:ring-pink-dark2 focus:ring-opacity-50 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-dark2 focus:ring focus:ring-pink-dark2 focus:ring-opacity-50 ${
                          errors.password ? "border-red-500" : ""
                        }`}
                      />
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {activeTab === "signup" && (
                      <div>
                        <label
                          htmlFor="repeatPassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Repeat Password
                        </label>
                        <input
                          type="password"
                          id="repeatPassword"
                          name="repeatPassword"
                          value={credentials.repeatPassword}
                          onChange={handleChange}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-dark2 focus:ring focus:ring-pink-dark2 focus:ring-opacity-50 ${
                            errors.repeatPassword ? "border-red-500" : ""
                          }`}
                        />
                        {errors.repeatPassword && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.repeatPassword}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex justify-center rounded-md border border-transparent bg-pink-dark2 px-4 py-2 text-sm font-medium text-white hover:bg-pink-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-dark2 focus-visible:ring-offset-2 disabled:opacity-50"
                      >
                        {loading ? (
                          <span>Processing...</span>
                        ) : (
                          <span>
                            {activeTab === "login" ? "Log In" : "Sign Up"}
                          </span>
                        )}
                      </button>
                    </div>

                    <div className="text-center text-sm">
                      <button
                        type="button"
                        className="text-pink-dark2 hover:underline"
                        onClick={() => {
                          setActiveTab(
                            activeTab === "login" ? "signup" : "login",
                          );
                          setErrors({});
                        }}
                      >
                        {activeTab === "login"
                          ? "Don't have an account? Sign up"
                          : "Already have an account? Log in"}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
};

export default Header;
