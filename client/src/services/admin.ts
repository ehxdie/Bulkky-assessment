import api from "./api";
import { CreateProductRequest, 
         CreateProductResponse,
         UpdateProductRequest,
         UpdateProductResponse,
        DeleteProductResponse } from "../types/admin";


// Create a product
export function createProduct(data: CreateProductRequest) {
  return api.post<CreateProductResponse>("/admin/products", data);
}

// Update a product
export function updateProduct(id: string, data: UpdateProductRequest) {
  return api.put<UpdateProductResponse>(`/admin/products/${id}`, data);
}

// Delete a product
export function deleteProduct(id: string) {
  return api.delete<DeleteProductResponse>(`/admin/products/${id}`);
}
