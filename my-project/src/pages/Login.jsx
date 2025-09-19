import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate=useNavigate()
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleLogion = async () => {
    console.log(input, "input");
    try {
      const { data } = await axios.post(
        "http://localhost:3002/api/v2/authentication/login",
        input
      );
      console.log(data, "data");
      toast.success(data.message || "successfully Login");
      setInterval(()=>{
           navigate("/")
      },100)
    } catch (error) {
      console.log(error, "error");
      toast.error(error.response.data.message || "login faild");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[600px] h-[500px] p-12 mx-auto shadow-md bg-emerald-600 rounded-lg mt-20 ">
      <h1 className="font-serif font-bold text-xl text-center">Login user:</h1>
      <div>
        <label
          for="username"
          class="block text-sm text-gray-800 dark:text-gray-300"
        >
          Email:
        </label>

        <input
          name="email"
          onChange={handleInput}
          type="email"
          placeholder="Jarin@gmail.com"
          class="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
        />
      </div>
      <div>
        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm text-gray-800 dark:text-gray-300"
            >
              Password
            </label>
            <a
              href="#"
              class="text-xs text-gray-600 hover:underline dark:text-gray-400"
            >
              Forget Password?
            </a>
          </div>

          <div class="relative flex items-center mt-2">
            <button class="absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 mx-4 text-gray-00 transition-colors duration-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
              >
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path
                  fill-rule="evenodd"
                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <input
              name="password"
              onChange={handleInput}
              type="password"
              placeholder="********"
              class="block w-full py-2.5 text-gray-700
         placeholder-gray-400/70 bg-white border
          border-gray-200 rounded-lg pl-5 pr-11 rtl:pr-5 rtl:pl-11
           dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600
            focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300
            focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>
      </div>
      <div className="my-4">
        <button
          class="px-6 py-2 w-full font-medium tracking-wide text-white capitalize transition-colors duration-300 transform
         bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring
          focus:ring-blue-300 focus:ring-opacity-80"
          onClick={handleLogion}
        >
          {loading ? "Login..." : "submit"}
        </button>
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default Login;
