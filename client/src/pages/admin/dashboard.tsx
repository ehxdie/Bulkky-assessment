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
      // store the data URL in imageUrl; server will receive base64 string
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <form className="mb-6 flex flex-col gap-2" onSubmit={handleCreate}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border px-2"
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border px-2"
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={String(form.price)}
          onChange={handleChange}
          className="border px-2"
          required
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={String(form.stock)}
          onChange={handleChange}
          className="border px-2"
          required
        />

        <label className="flex flex-col">
          <span>Image</span>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>

        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="preview"
            className="w-32 h-32 object-cover mt-2"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={uploading}
        >
          {uploading ? "Processing..." : "Create"}
        </button>
      </form>

      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className="mb-2 flex flex-col gap-2 border-b pb-2"
          >
            {editId === product.id ? (
              <form className="flex flex-col gap-2" onSubmit={handleUpdate}>
                <input
                  name="name"
                  placeholder="Name"
                  value={(editForm.name as string) ?? ""}
                  onChange={(e) =>
                    setEditForm((s) => ({ ...(s || {}), name: e.target.value }))
                  }
                  className="border px-2"
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
                  className="border px-2"
                  required
                />
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
                  className="border px-2"
                  required
                />
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
                  className="border px-2"
                  required
                />

                <label className="flex flex-col">
                  <span>Change Image</span>
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
                    className="w-32 h-32 object-cover mt-2"
                  />
                )}

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="bg-gray-400 text-white px-2 py-1 rounded"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-sm text-gray-600">${product.price}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
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
  );
};

export default AdminDashboard;
