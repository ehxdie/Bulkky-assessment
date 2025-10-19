// Request type for creating a product
export interface CreateProductRequest  {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
};

// Response type for creating a product
export interface CreateProductResponse {
  status: string;
  data: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
  };
  message: string;
};

// Request type for updating a product
export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  imageUrl?: string;
}

// Response type for updating a product
export interface UpdateProductResponse {
  status: string;
  data: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
  };
  message: string;
}

// Response type for deleting a product
export interface DeleteProductResponse {
  status: string;
  data: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
  };
  message: string;
}
