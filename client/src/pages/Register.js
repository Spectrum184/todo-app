import axios from "axios";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function RegisterForm() {
  const initialUserInfo = {
    username: "",
    password: "",
    role: "User",
    firstName: "",
    lastName: "",
    email: "",
    telephoneNumber: "",
  };

  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleConfirmPassword = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };

  useEffect(() => {
    if (confirmPassword !== "") {
      if (userInfo.password === confirmPassword) {
        setConfirmPasswordError(false);
      } else {
        setConfirmPasswordError(true);
      }
    }
  }, [confirmPassword, userInfo.password]);

  useEffect(() => {
    if (
      !userInfo.username ||
      !userInfo.password ||
      !userInfo.firstName ||
      !userInfo.lastName ||
      !userInfo.email ||
      userInfo.telephoneNumber.length !== 10 ||
      !/^[0-9]*$/.test(userInfo.telephoneNumber)
    ) {
      setEnableSubmit(false);
    } else {
      setEnableSubmit(true);
    }
  }, [userInfo]);

  const handleBlur = () => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (userInfo.email) {
      return regex.test(userInfo.email)
        ? userInfo.email
        : toast.error("🦄 must be email");
    }
  };
  // const handleBlurConfirmPassword = () => {
  //   if (confirmPassword !== "") {
  //     if (userInfo.password === confirmPassword) {
  //       setConfirmPasswordError(false);
  //     } else {
  //       setConfirmPasswordError(true);
  //     }
  //   }
  // };

  const onSubmit = (e) => {
    const regexNumber = /^[0-9]*$/;
    e.preventDefault();
    if (!userInfo.username) {
      toast.error("🦄 please enter your username");
    } else if (!userInfo.password) {
      toast.error("🦄 please enter your password");
    } else if (!userInfo.firstName) {
      toast.error("🦄 please enter your firstName");
    } else if (!userInfo.lastName) {
      toast.error("🦄 please enter your lastName");
    } else if (!userInfo.email) {
      toast.error("🦄 please enter your email");
    } else if (!userInfo.telephoneNumber) {
      toast.error("🦄 please enter your telephoneNumber");
    } else if (userInfo.telephoneNumber.length !== 10) {
      toast.error("🦄 Phone number must have 10 characters");
    } else if (
      // isNaN(Number(userInfo.telephoneNumber))
      !regexNumber.test(userInfo.telephoneNumber)
    ) {
      toast.error("🦄 Phone number must be number");
    } else {
      const userTel = userInfo.telephoneNumber
        .slice(0, 3)
        .concat(
          "-",
          userInfo.telephoneNumber.slice(3, 6),
          "-",
          userInfo.telephoneNumber.slice(6)
        );
      axios
        .post("http://localhost:5000/api/user", {
          ...userInfo,
          telephoneNumber: userTel,
        })
        .then((resp) => {
          console.log(resp.data);
          toast.success("Account info saved!");
        })
        .catch(function (error) {
          console.log(error);
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div class="min-h-screen flex flex-col items-center justify-center h-full bg-gradient-to-tl from-green-400 to-indigo-900">
      <div
        class="
          flex flex-col
          bg-white
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
 lg:w-1/3  md:w-1/2 w-full p-10 mt-16
        "
      >
        <div class="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Beto Todo App
        </div>
        <div class="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Create a account
        </div>

        <div class="mt-10">
          <form action="#" method="post">
            <div class="flex flex-col mb-2">
              <div class="mb-1 text-4 tracking-wide text-gray-600">
                Username
              </div>
              <div class="relative">
                <div
                  class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                ></div>

                <input
                  type="text"
                  name="username"
                  value={userInfo.username}
                  onChange={handleChange}
                  class="
                    text-sm
                    placeholder-gray-30
                    pl-2
                    pr-2
                    rounded-md
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Enter your name"
                />
              </div>
            </div>
            <div class="flex flex-col mb-2">
              <div class="mb-1 text-4 tracking-wide text-gray-600">
                Password
              </div>
              <div class="relative">
                <div
                  class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                ></div>

                <input
                  type="password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleChange}
                  className={
                    confirmPasswordError
                      ? `
                    text-sm
                    placeholder-gray-30
                    pl-2
                    pr-2
                    rounded-md
                    border border-red-400
                    w-full
                    py-2
                    focus:outline-none focus:border-red-500
                  `
                      : `
                    text-sm
                    placeholder-gray-30
                    pl-2
                    pr-2
                    rounded-md
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-500
                  `
                  }
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div class="flex flex-col mb-2">
              <div class="mb-1 text-4 tracking-wide text-gray-600">
                Confirm Password
              </div>
              <div class="relative">
                <div
                  class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                ></div>

                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                  className={
                    confirmPasswordError
                      ? `
                    text-sm
                    placeholder-gray-30
                    pl-2
                    pr-2
                    rounded-md
                    border border-red-400
                    w-full
                    py-2
                    focus:outline-none focus:border-red-400
                  `
                      : `
                    text-sm
                    placeholder-gray-30
                    pl-2
                    pr-2
                    rounded-md
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  `
                  }
                  placeholder="Enter your password"
                />
              </div>
              {confirmPasswordError ? (
                <p className="text-red-800">Please confirm your password</p>
              ) : (
                <></>
              )}
            </div>
            <div class="flex flex-col mb-2">
              <div class="mb-1 text-4 tracking-wide text-gray-600">Role</div>
              <div class="relative">
                <div
                  class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                ></div>

                <select
                  type="text"
                  name="role"
                  value={userInfo.role}
                  onChange={handleChange}
                  class="
                    text-sm
                    placeholder-gray-30
                    pl-2
                    pr-2
                    rounded-md
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <div class="flex flex-col mb-2">
              <div class="mb-1 text-4 tracking-wide text-gray-600">
                FirstName
              </div>
              <div class="relative">
                <div
                  class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                ></div>

                <input
                  type="text"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleChange}
                  class="
                    text-sm
                    placeholder-gray-30
                    pl-2
                    pr-2
                    rounded-md
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Enter your firstName"
                />
              </div>
            </div>
            <div class="flex flex-col mb-2">
              <div class="mb-1 text-4 tracking-wide text-gray-600">
                LastName
              </div>
              <div class="relative">
                <div
                  class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                ></div>

                <input
                  type="text"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleChange}
                  class="
                    text-sm
                    placeholder-gray-30
                    pl-2
                    pr-2
                    rounded-md
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Enter your lastName"
                />
              </div>
            </div>
            <div class="flex flex-col mb-2">
              <div class="mb-1 text-4 tracking-wide text-gray-600">Email</div>
              <div class="relative">
                <div
                  class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                ></div>

                <input
                  type="text"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  class="
                    text-sm
                    placeholder-gray-30
                    pl-2
                    pr-2
                    rounded-md
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div class="flex flex-col mb-2">
              <div class="mb-1 text-4 tracking-wide text-gray-600">
                TelephoneNumber
              </div>
              <div class="relative">
                <div
                  class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                ></div>

                <input
                  type="text"
                  name="telephoneNumber"
                  value={userInfo.telephoneNumber}
                  onChange={handleChange}
                  class="
                    text-sm
                    placeholder-gray-30
                    pl-2
                    pr-2
                    rounded-md
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Enter your telephoneNumber"
                />
              </div>
            </div>

            <div class="flex w-full">
              <button
                type="submit"
                onClick={onSubmit}
                class={
                  enableSubmit
                    ? `
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-blue-500
                  hover:bg-blue-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                `
                    : `
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-blue-500
                  rounded-2xl
                  py-2
                  w-full
                `
                }
              >
                <span class="mr-2 uppercase">Register</span>
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
