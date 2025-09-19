import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Otp from "../component/Otp";

const Registration = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleClick = async () => {
    console.log(form, "13");
    try {
      const { data } = await axios.post(
        "http://localhost:3002/api/v2/authentication/registration",
        form,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(data, "registration response");
      toast.success("Registration successfully done");
      setShow(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Registration failed");
    }
  };
  return (
    <div className="relative w-[600px] h-[500px] p-10 mx-auto">
      <h1 className="font-serif font-bold text-2xl text-center">
        Resgistration here:
      </h1>
      <div>
        <p className="font-serif font-medium text-xl my-2">First Name:</p>
        <input
          onChange={handleChange}
          name="firstName"
          type="text"
          placeholder="first name"
          className="input input-secondary w-full"
        />
      </div>
      <div>
        <p className="font-serif font-medium text-xl my-2">Email:</p>
        <input
          onChange={handleChange}
          name="email"
          type="text"
          placeholder="Email"
          className="input input-secondary w-full"
        />
      </div>
      <div>
        <p className="font-serif font-medium text-xl my-2">Password:</p>
        <input
          onChange={handleChange}
          name="password"
          type="text"
          placeholder="pasword"
          className="input input-secondary w-full"
        />
      </div>
      <div className="my-3">
        <button className="btn btn-error w-full" onClick={handleClick}>
          Sign in
        </button>
      </div>
      <Toaster></Toaster>
      {show && <Otp data={form.email} setShow={setShow}></Otp>}
    </div>
  );
};

export default Registration;
