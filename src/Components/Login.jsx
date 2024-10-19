//import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const [message, setMessage] = useState("");

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5184/api/authenticate",
  //       {
  //         username,
  //         password,
  //       }
  //     );
  //     setMessage(response.data.message);
  //   } catch (error) {
  //     setMessage("Login failed. Please try again.");
  //   }
  // };
  const handleLogin = () => {
    // Replace this with your authentication logic
    if (username === "student" && password === "1234") {
      navigate("/StudentTable");
    } else if (username === "teacher" && password === "2143") {
      navigate("/AssignmentTable");
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center">
          <img src="/logo_mobile.png" alt="Logo" className="w-24" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Sign in to your account
        </h2>

        {/* {error && <p className="mt-4 text-center text-red-600">{error}</p>} */}

        <form onSubmit={handleLogin} className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username :
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
