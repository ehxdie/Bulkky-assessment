import api from "./api";
import { AddProductToCartRequest,
         AddProductToCartResponse,
         GetCartResponse,
         UpdateCartItemQuantityRequest,
         UpdateCartItemQuantityResponse,
         DeleteCartItemResponse
} from "../types/cart";

export function addProductToCart(data: AddProductToCartRequest) {
  return api.post<AddProductToCartResponse>(
    "/cart/products", data);
}

// Get all cart items for the user
export function getCart() {
  return api.get<GetCartResponse>("/cart");
}

// Update quantity of a cart item
export function updateCartItemQuantity(
  cartItemId: string,
  data: UpdateCartItemQuantityRequest
) {
  return api.put<UpdateCartItemQuantityResponse>(
    `/cart/products/${cartItemId}`,
    data // <-- send data directly, not { body: data }
  );
}

// Delete a cart item
export function deleteCartItem(cartItemId: string) {
  return api.delete<DeleteCartItemResponse>(`/cart/products/${cartItemId}`);
}
