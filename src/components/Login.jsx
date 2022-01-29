import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle } = useAuth();
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
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded mb-7">Login</button>

        <Link to="/register" className="block text-center -mb-3 underline">You do not have an Account?</Link>
      </form>

      <button onClick={handleGoogleSignin} className="text-lg">Google Login</button>
    </div>
  );
}
