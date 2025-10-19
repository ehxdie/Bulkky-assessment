export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface PlaceOrderResponse {
  status: string;
  data: {
    id: string;
    userId: string;
    total: number;
    status: string;
    createdAt: string;
    items: OrderItem[];
  };
  message: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export interface GetOrdersResponse {
  status: string;
  data: Order[];
  message: string;
}