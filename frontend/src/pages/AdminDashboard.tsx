import React, { useEffect, useState, useCallback } from "react";
import Header from "../components/Header";
import axios from "axios";

type Product = {
  _id: string;
  name: string;
  description: string;
  prices: number;
  category: string;
  stock: number;
  sizes: string[];
  images: string[];
};

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    prices: "",
    category: "",
    stock: "",
    sizes: "",
    images: [] as File[],
    imagePreviews: [] as string[],
  });

  const token = localStorage.getItem("token");

  // 📦 Fetch all products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🖱️ Drag & Drop handlers
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    const previews = files.map((f) => URL.createObjectURL(f));

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
      imagePreviews: [...prev.imagePreviews, ...previews],
    }));
  }, []);

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map((f) => URL.createObjectURL(f));

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
      imagePreviews: [...prev.imagePreviews, ...previews],
    }));
  };

  const handleRemoveImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imagePreviews: prev.imagePreviews.filter((_, i) => i !== index),
    }));
  };

  // 📤 Submit form (create or update)
  const handleSave = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("prices", form.prices);
      formData.append("category", form.category);
      formData.append("stock", form.stock);
      formData.append("sizes", form.sizes);

      form.images.forEach((file) => {
        formData.append("images", file);
      });

      if (editingId) {
        // UPDATE PRODUCT
        await axios.put(
          `http://localhost:3000/products/${editingId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // CREATE PRODUCT
        await axios.post("http://localhost:3000/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setForm({
        name: "",
        description: "",
        prices: "",
        category: "",
        stock: "",
        sizes: "",
        images: [],
        imagePreviews: [],
      });
      setEditingId(null);
      fetchProducts();
    } catch (err: any) {
      console.error("Error saving product:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      prices: product.prices.toString(),
      category: product.category,
      stock: product.stock.toString(),
      sizes: product.sizes.join(","),
      images: [],
      imagePreviews: product.images,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F2E6DC] text-coco font-playfair p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

        {/* FORM */}
        <div className="bg-white rounded-xl shadow p-6 mb-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">
            {editingId ? "Update Product" : "Create Product"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={form.prices}
              onChange={(e) => setForm({ ...form, prices: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Sizes (comma separated)"
              value={form.sizes}
              onChange={(e) => setForm({ ...form, sizes: e.target.value })}
              className="border p-2 rounded col-span-2"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border p-2 rounded col-span-2"
            />
          </div>

          {/* DRAG & DROP AREA */}
          <div
            className="border-2 border-dashed border-wine rounded-xl p-6 text-center mt-4 hover:bg-[#f9f2ee] transition cursor-pointer"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <p className="text-wine text-lg font-semibold">
              Drag & drop images here, or click to select
            </p>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleSelectFiles}
            />
          </div>

          {/* IMAGE PREVIEWS */}
          {form.imagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              {form.imagePreviews.map((src, i) => (
                <div key={i} className="relative group">
                  <img
                    src={src}
                    alt="preview"
                    className="w-28 h-28 object-cover rounded-xl shadow"
                  />
                  <button
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 py-0 text-sm opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={loading}
            className="mt-6 px-6 py-2 bg-wine text-[#F2E6DC] rounded-lg hover:opacity-90 transition"
          >
            {loading
              ? "Saving..."
              : editingId
              ? "Update Product"
              : "Add Product"}
          </button>
        </div>

        {/* PRODUCTS LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center"
            >
              {product.images?.[0] && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-48 h-48 object-cover rounded-xl mb-4"
                />
              )}
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-wine">{product.category}</p>
              <p className="font-bold">${product.prices}</p>
              <p className="text-sm mt-1">Sizes: {product.sizes.join(", ")}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="px-4 py-2 bg-coco text-[#F2E6DC] rounded-lg hover:opacity-80 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:opacity-80 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
