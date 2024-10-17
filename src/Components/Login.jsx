// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useState } from "react";

// function Login() {
//   // const navigate = useNavigate();
//   // const dispatch = useDispatch(); // Uncomment when using Redux dispatch
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [error, setError] = useState("");

//   const login = async (data) => {
 
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
//         <div className="flex justify-center">
//           <img src="/logo_mobile.jpg" alt="Logo" className="w-24" />
//         </div>
//         <h2 className="text-center text-2xl font-bold text-gray-900">
//           Sign in to your account
//         </h2>

//         {error && <p className="mt-4 text-center text-red-600">{error}</p>}

//         <form onSubmit={handleSubmit(login)} className="mt-6 space-y-6">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email:
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Enter Your Email"
//               className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
             
//             />
//             {errors.email && (
//               <p className="mt-1 text-sm text-red-600">
//                 {/* {errors.email.message} */}
//               </p>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password:
//             </label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Enter Your Password"
//               className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              
//             />
//             {/* {errors.password && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.password.message}
//               </p>
//             )} */}
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             >
//               Sign In
//             </button>
//           </div>
//         </form>

//         <div className="flex justify-between mt-6 text-sm">
//           <Link to="#" className="text-indigo-600 hover:text-indigo-500">
//             Forgot your password?
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    // Placeholder for login logic
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

        <form onSubmit={handleSubmit(login)} className="mt-6 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Your Email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Your Password"
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

        <div className="flex justify-between mt-6 text-sm">
          {/* <Link to="#" className="text-indigo-600 hover:text-indigo-500"> */}
            Forgot your password?
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
