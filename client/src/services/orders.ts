import api from "./api";
import {
  PlaceOrderResponse,
  GetOrdersResponse,
} from "../types/orders"

// Service: Place order from cart
export function placeOrderFromCart() {
  return api.post<PlaceOrderResponse>("/orders");
}

// Service: Get all orders for the authenticated user
export function getOrders() {
  return api.get<GetOrdersResponse>("/orders");
}
