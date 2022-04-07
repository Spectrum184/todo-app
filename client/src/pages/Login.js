import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function LoginForm() {
  const initialAccount = {
    username: "",
    password: "",
  };

  const [account, setAccount] = useState(initialAccount);
  const [saveLogin, setSaveLogin] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!account.username) {
      toast.error("Please enter your username");
    } else if (!account.password) {
      toast.error("Please enter your password");
    } else {
      axios
        .post("http://localhost:5000/api/user/login", account)
        .then((resp) => {
          console.log(resp.data);
          if (saveLogin) {
            localStorage.setItem("accessToken", resp.data.accessToken);
          } else {
            localStorage.removeItem("accessToken");
          }
          toast.success("successfully login");
        })
        .catch(function (error) {
          localStorage.removeItem("accessToken");

          console.log(error.response.data);
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div class="w-full min-h-screen bg-gradient-to-tl from-green-400 to-indigo-900 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      <div class="w-full sm:max-w-md p-5 mx-auto bg-gray-50">
        <h2 class="mb-2 text-center text-5xl font-extrabold text-green-500">
          Welcome to
        </h2>
        <h2 class="mb-8 text-center text-5xl font-extrabold text-green-500 sm: text-4xl">
          Beto Todo App
        </h2>
        <form action="#" method="post">
          <div class="mb-4">
            <label class="block mb-1 ">UserName</label>
            <div class=" flex flex-row border border-gray-300 block w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 mx-2 my-auto"
                fill="blue"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                class="py-2 px-3 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 shadow-sm disabled:bg-gray-100 block w-full"
                placeholder="Enter Your Userame"
              />
            </div>
          </div>
          <div class="mb-4">
            <label class="block mb-1">Password</label>
            <div class=" flex flex-row border border-gray-300 block w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 mx-2 my-auto"
                fill="blue"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                class="py-2 px-3 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 shadow-sm disabled:bg-gray-100 block w-full"
                placeholder="Enter Your Password"
              />
            </div>
          </div>
          <div class="mt-6 flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                value={saveLogin}
                onClick={() => setSaveLogin(!saveLogin)}
                class="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
              />
              <label
                for="remember_me"
                class="ml-2 block text-sm leading-5 text-gray-900"
              >
                {" "}
                Remember me{" "}
              </label>
            </div>
            <a href="#" class="text-sm hover:text-red-500">
              {" "}
              Forgot your password?{" "}
            </a>
          </div>
          <div class="mt-6">
            <button
              type="submit"
              onClick={onSubmit}
              class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
            >
              <span class="mr-2 uppercase">Login</span>
              <span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </button>
          </div>
          <div class="mt-6 text-center">
            <a
              href="#"
              class="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
            >
              <span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </span>
              <span class="ml-2">You don't have an account?</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

// return (
//   <div>
//     <div className="register-form">
//       <h1 className="header-1"> beto todo App</h1>
//       <div className="container">
//         <h2 className="header-2"> Login Account</h2>
//         <div className="container-form">
//           <div className="item">
//             <h3>UserName</h3>
//             <input
//               className="input-field"
//               type="text"
//               onChange={handleChange}
//               name="username"
//               placeholder="beto-todo-app"
//               value={account.username}
//             />
//           </div>
//           {/*
//                       <div className='item'>
//                           <h3>Role</h3>
//                           <input
//                               className="input-field"
//                               type="text"
//                               onChange={handleChange}
//                               name="role"
//                               placeholder='user or admin'
//                               value={account.role}
//                           />
//                       </div> */}

//           <div className="item">
//             <h3>Password</h3>
//             <input
//               className="input-field"
//               type="password"
//               onChange={handleChange}
//               name="password"
//               placeholder="password"
//               value={account.password}
//             />
//           </div>

//           <div className="button">
//             <button className="btn-commit" onClick={handleSubmit}>
//               login
//             </button>

//             <button className="btn-login">register</button>
//           </div>
//         </div>

//         <div>
//           {listAccount.length > 0 &&
//             listAccount.map((item, index) => (
//               <ul key={index}>
//                 <li>username:{item.username}</li>
//                 <li>password:{item.password}</li>
//                 <li>role:{item.role}</li>
//               </ul>
//             ))}
//         </div>
//         {/* <button className="btn-cancel" onClick={handleSubmitReset} >
//                      reset
//                   </button> */}
//       </div>
//     </div>
//   </div>
// );
