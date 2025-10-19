import React, { useState, useEffect } from "react";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/admin";
import { getAllProducts } from "../../services/client";
import type {
  CreateProductRequest,
  UpdateProductRequest,
} from "../../types/admin";
import type { Product } from "../../types/client";
import { fileToBase64 } from "../../utils/fileToBase64";

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<CreateProductRequest>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imageUrl: "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<UpdateProductRequest>({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      const resp = await getAllProducts();
      setProducts(resp.data.data);
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({
      ...s,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      setForm((s) => ({ ...s, imageUrl: base64 }));
    } finally {
      setUploading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProduct(form);
    const resp = await getAllProducts();
    setProducts(resp.data.data);
    setForm({ name: "", description: "", price: 0, stock: 0, imageUrl: "" });
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    const resp = await getAllProducts();
    setProducts(resp.data.data);
  };

  const handleEdit = (product: Product) => {
    setEditId(product.id);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
    });
  };

  const handleEditFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      setEditForm((s) => ({ ...(s || {}), imageUrl: base64 }));
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    await updateProduct(editId, editForm);
    const resp = await getAllProducts();
    setProducts(resp.data.data);
    setEditId(null);
    setEditForm({});
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditForm({});
  };

  return (
    <div
      className="p-4 md:p-8 h-full flex flex-col font-sans bg-gray-50 min-h-screen"
      style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Admin Dashboard
      </h2>

      <form
        className="mb-8 flex flex-col gap-4 bg-white rounded-xl shadow p-6 w-full max-w-xl mx-auto"
        onSubmit={handleCreate}
      >
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          required
        />
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="flex flex-col flex-1">
            <label className="text-sm text-gray-700 mb-1">Price</label>
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={String(form.price)}
              onChange={handleChange}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-sm text-gray-700 mb-1">Stock</label>
            <input
              name="stock"
              type="number"
              placeholder="Stock"
              value={String(form.stock)}
              onChange={handleChange}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              required
            />
          </div>
        </div>

        <label className="flex flex-col mt-2">
          <span className="mb-1 text-sm text-gray-700">Image</span>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>

        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="preview"
            className="w-32 h-32 object-cover mt-2 rounded"
          />
        )}

        <button
          type="submit"
          className="bg-gray-700 text-white px-4 py-2 rounded font-semibold shadow hover:bg-gray-800 transition"
          disabled={uploading}
        >
          {uploading ? "Processing..." : "Create Product"}
        </button>
      </form>

      <div
        className="flex-1 overflow-y-auto border rounded bg-white pb-10 shadow w-full max-w-3xl mx-auto"
        style={{ minHeight: "300px", maxHeight: "60vh" }}
      >
        <ul>
          {products.map((product) => (
            <li
              key={product.id}
              className="mb-4 flex flex-col gap-2 border-b pb-4 px-4"
            >
              {editId === product.id ? (
                <form className="flex flex-col gap-2" onSubmit={handleUpdate}>
                  <input
                    name="name"
                    placeholder="Name"
                    value={(editForm.name as string) ?? ""}
                    onChange={(e) =>
                      setEditForm((s) => ({
                        ...(s || {}),
                        name: e.target.value,
                      }))
                    }
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                    required
                  />
                  <input
                    name="description"
                    placeholder="Description"
                    value={(editForm.description as string) ?? ""}
                    onChange={(e) =>
                      setEditForm((s) => ({
                        ...(s || {}),
                        description: e.target.value,
                      }))
                    }
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                    required
                  />
                  <div className="flex gap-4 flex-col sm:flex-row">
                    <div className="flex flex-col flex-1">
                      <label className="text-sm text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={String(editForm.price ?? "")}
                        onChange={(e) =>
                          setEditForm((s) => ({
                            ...(s || {}),
                            price: Number(e.target.value),
                          }))
                        }
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                        required
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <label className="text-sm text-gray-700 mb-1">
                        Stock
                      </label>
                      <input
                        name="stock"
                        type="number"
                        placeholder="Stock"
                        value={String(editForm.stock ?? "")}
                        onChange={(e) =>
                          setEditForm((s) => ({
                            ...(s || {}),
                            stock: Number(e.target.value),
                          }))
                        }
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                        required
                      />
                    </div>
                  </div>

                  <label className="flex flex-col mt-2">
                    <span className="mb-1 text-sm text-gray-700">
                      Change Image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEditFileChange}
                    />
                  </label>

                  {editForm.imageUrl && (
                    <img
                      src={editForm.imageUrl as string}
                      alt="preview"
                      className="w-32 h-32 object-cover mt-2 rounded"
                    />
                  )}

                  <div className="flex gap-2 mt-2">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-green-700 transition"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="bg-gray-400 text-white px-4 py-2 rounded font-semibold shadow hover:bg-gray-500 transition"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <div className="font-semibold text-lg text-gray-800">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      {product.description}
                    </div>
                    <div className="flex gap-4 text-sm text-gray-700">
                      <span>
                        <strong>Price:</strong> ${product.price}
                      </span>
                      <span>
                        <strong>Stock:</strong> {product.stock}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                      className="bg-gray-700 text-white px-3 py-1 rounded font-semibold shadow hover:bg-gray-800 transition"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded font-semibold shadow hover:bg-red-600 transition"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
