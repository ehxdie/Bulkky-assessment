import api from "./api";
import { CreateWishlistResponse, CreateWishlistRequest, GetWishlistResponse, DeleteWishlistRequest, DeleteWishlistResponse  } from "../types/wishlist"

// Service: Create wishlist entry
export function createWishlist(data: CreateWishlistRequest) {
  return api.post<CreateWishlistResponse>("/wishlist", data);
}

// Service: Get all wishlist items by userId
export function getWishlist() {
  return api.get<GetWishlistResponse>(`/wishlist`);
}

// Service: Delete wishlist entry by productId and userId
export function deleteWishlist(data: DeleteWishlistRequest) {
  return api.delete<DeleteWishlistResponse>("/wishlist", { data });
}
