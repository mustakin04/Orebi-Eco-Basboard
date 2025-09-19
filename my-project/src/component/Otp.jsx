import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
const Otp = ({ data, setShow }) => {
  const navigate=useNavigate()
  const [forms, setForms] = useState({
    email: data || "", // props থেকে সরাসরি email set করা হলো
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForms({ ...forms, [e.target.name]: e.target.value });
  };

  
const handleOtp = async () => {
  try {
    console.log("Submitting forms:", forms);
    setLoading(true);
    setError("");
    const { data } = await axios.post(
      "http://localhost:3002/api/v2/authentication/otpverify",
      forms,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    console.log(data, "res");
    toast.success("OTP Verified Successfully!");
    setInterval(() => {
        navigate("/login")
    }, 200);
  } catch (err) {
  console.error("OTP Verify Error:", err);
  console.log("Full Error Response:", err.response?.data); // 👈 দেখো এখানে কি আসছে

  setError(err.response?.data?.message || "Something went wrong!");
}
 finally {
      // ✅ সবসময় loading বন্ধ হবে
      setLoading(false);
    }
};

  return (
    <div className="absolute z-[999] top-36 w-[500px] h-[400px] mx-auto bg-blue-300 rounded-lg shadow-lg">
      <div className="flex text-center font-serif font-bold gap-20 my-10 text-2xl justify-center">
        <h1>Otp Submit</h1>
        <p
          className="text-red-500 cursor-pointer"
          onClick={() => setShow(false)}
        >
          ✕
        </p>
      </div>

      <div className="p-14">
        <div>
          <p className="font-serif font-medium text-xl my-2">Email:</p>
          <input
            type="email"
            value={forms.email}
            className="input input-secondary w-full"
            name="email"
          />
        </div>

        <div>
          <p className="font-serif font-medium text-xl my-2">Otp:</p>
          <input
            type="text"
            placeholder="Enter OTP"
            className="input input-secondary w-full"
            onChange={handleChange}
            name="otp"
            value={forms.otp}
          />
        </div>

        {error && <p className="text-red-600 my-2">{error}</p>}

        <button
          className="btn btn-error w-full my-3"
          onClick={handleOtp}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Otp;
