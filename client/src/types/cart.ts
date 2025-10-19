export interface AddProductToCartRequest {
  productId: string;
  quantity: number;
}

// Response type for addProductToCart
export interface AddProductToCartResponse {
  status: string;
  data: {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
  };
  message: string;
}

// Response type for getCart service function
export interface GetCartResponse {
  status: string;
  data: Array<{
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    product: {
      id: string;
      name: string;
      description: string;
      price: number;
      stock: number;
      imageUrl: string;
    };
    user: {
      id: string;
      email: string;
      password: string;
      name: string;
      role: string;
    };
  }>;
  message: string;
}

// Request type for updateCartItemQuantity
export interface UpdateCartItemQuantityRequest {
  quantity: number;
}

// Response type for updateCartItemQuantity
export interface UpdateCartItemQuantityResponse {
  status: string;
  data: {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
  };
  message: string;
}

// Response type for deleteCartItem
export interface DeleteCartItemResponse {
  status: string;
  data: {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
  };
  message: string;
}