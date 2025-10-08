import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  address?: string;
  phone?: string;
};

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return alert("Please log in first");

        const res = await axios.get("http://localhost:3000/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user);
        setFormData({
          name: res.data.user.name || "",
          address: res.data.user.address || "",
          phone: res.data.user.phone || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update profile
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please log in first");

      await axios.put("http://localhost:3000/users/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser((prev) =>
        prev ? { ...prev, ...formData } : (formData as unknown as User)
      );
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  if (loading)
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#F2E6DC] flex items-center justify-center text-coco font-playfair">
          Loading profile...
        </div>
      </>
    );

  if (!user)
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#F2E6DC] flex items-center justify-center text-wine font-playfair">
          No profile data found.
        </div>
      </>
    );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F2E6DC] p-8 flex flex-col items-center font-playfair">
        <h1 className="text-3xl font-bold text-coco mb-6">Your Profile</h1>

        <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-lg border border-[#e5d0c0]">
          {!editing ? (
            <>
              <p className="text-lg text-coco mb-2">
                <strong>Name:</strong> {user.name}
              </p>
              <p className="text-lg text-coco mb-2">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-lg text-coco mb-2">
                <strong>Role:</strong> {user.role}
              </p>
              <p className="text-lg text-coco mb-2">
                <strong>Address:</strong> {user.address || "Not set"}
              </p>
              <p className="text-lg text-coco mb-4">
                <strong>Phone:</strong> {user.phone || "Not set"}
              </p>

              <button
                onClick={() => setEditing(true)}
                className="bg-wine text-[#F2E6DC] px-6 py-2 rounded-lg hover:opacity-90 transition"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-coco font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-[#e5d0c0] rounded-md px-3 py-2 mt-1 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-coco font-semibold">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-[#e5d0c0] rounded-md px-3 py-2 mt-1 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-coco font-semibold">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-[#e5d0c0] rounded-md px-3 py-2 mt-1 focus:outline-none"
                />
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="bg-gray-300 text-coco px-5 py-2 rounded-lg hover:opacity-90 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-wine text-[#F2E6DC] px-5 py-2 rounded-lg hover:opacity-90 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
