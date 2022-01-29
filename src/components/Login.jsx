import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.code);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.code);
    }
  };

  const handleResetPassword = async () => {
    try {
      if (!user.email) return setError("Please enter your email");
      await resetPassword(user.email);
      setError("We send an email with a link to reset your password")
    } catch (error) {
      setError(error)
    }
  };

  return (
    <div className="w-full m-auto h-full flex justify-center items-center flex-col">
      <Alert message={error} />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-8 mb-6 w-96"
      >
        <div className="mb-6">
          <label htmlFor="email" className="block text-lg font-bold mb-1">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="shadow apparance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus-shadow-outline"
            placeholder="youremail@company.ltd"
            onChange={handleChange}
          />
        </div>
        <div className="mb-7">
          <label htmlFor="password" className="block text-lg font-bold mb-1">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="shadow apparance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus-shadow-outline"
            placeholder="*******"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
            Login
          </button>
          <a
            href="#!"
            onClick={handleResetPassword}
            className="inline-block align-baseline font-bold text-blue-500"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <Link to="/register" className="block text-center mb-5 text-lg">
        Don't have an account?{" "}
        <span className="text-blue-500 font-bold">Create one</span>
      </Link>
      <button
        onClick={handleGoogleSignin}
        className="text-lg flex items-center justify-center bg-white shadow-md py-2 px-6 rounded"
      >
        <img src="google.svg" alt="Google" className="h-6 mr-3" /> Sign up with
        Google
      </button>
    </div>
  );
}
