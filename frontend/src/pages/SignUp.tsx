import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/auth/sign-up", {
        ...formData,
      });

      // Save token and user in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/"); // redirect after success
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || "Something went wrong");
      } else {
        setError("Server error, please try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-[#F2E6DC] px-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <h1 className="text-3xl md:text-4xl font-bold font-playfair text-coco mb-4 text-center">
          Create an Account
        </h1>
        <p className="text-center text-gray-600 font-playfair mb-8">
          Join Vintara and step into timeless fashion.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium font-playfair text-coco">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-wine outline-none"
              placeholder="Enter your full name"
              required
            />
          </div>

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

          {/* Error message */}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-wine text-[#F2E6DC] font-playfair font-semibold rounded-lg hover:bg-[#5e0c2d] transition disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm font-playfair mt-6">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-wine font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
