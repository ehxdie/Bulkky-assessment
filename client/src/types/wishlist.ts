// Request type for creating a wishlist entry
export interface CreateWishlistRequest {
  productId: string;
}

// Response type for creating a wishlist entry
export interface CreateWishlistResponse {
  status: string;
  data: {
    id: string;
    userId: string;
    productId: string;
  };
  message: string;
}

// Response type for getting wishlist by user
export interface WishlistProduct {
  id: string;
  userId: string;
  productId: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
  };
}

export interface GetWishlistResponse {
  status: string;
  data: WishlistProduct[];
  message: string;
}

// Request type for deleting a wishlist entry
export interface DeleteWishlistRequest {
  productId: string;
}

// Response type for deleting a wishlist entry
export interface DeleteWishlistResponse {
  status: string;
  data: {
    id: string;
    userId: string;
    productId: string;
  };
  message: string;
}