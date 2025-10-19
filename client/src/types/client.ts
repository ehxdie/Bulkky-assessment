export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export interface GetAllProductsResponse {
  status: string;
  data: Product[];
  message: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export interface GetProductResponse {
  status: string;
  data: Product;
  message: string;
}