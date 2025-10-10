import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    
    try {
      const res = await axios.post("http://localhost:3000/auth/sign-in",
        {
          ...formData
        }
      )

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data))

      navigate('/')
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message || "Something went wrong");
      } else {
        setError("Server error, please try again later");
      }
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-[#F2E6DC] px-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <h1 className="text-3xl md:text-4xl font-bold font-playfair text-coco mb-4 text-center">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 font-playfair mb-8">
          Log in to continue exploring timeless fashion.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium font-playfair text-coco">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-wine outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium font-playfair text-coco">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-wine outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-wine text-[#F2E6DC] font-playfair font-semibold rounded-lg hover:bg-[#5e0c2d] transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm font-playfair mt-6">
          Don't have an account? 
          <Link to="/sign-up" className="pl-1 text-wine font-semibold">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignIn;
