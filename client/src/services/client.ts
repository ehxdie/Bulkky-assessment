import api from "./api";
import { GetAllProductsResponse, GetProductResponse } from "../types/client";


// Service: Get all products
export function getAllProducts() {
  return api.get<GetAllProductsResponse>("/client/products");
}

// Service: Get a single product by ID
export function getProduct(id: string) {
  return api.get<GetProductResponse>(`/client/products/${id}`);
}