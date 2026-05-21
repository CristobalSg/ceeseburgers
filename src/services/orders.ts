import { supabase } from "@/lib/supabase";

export type OrderType = "pickup" | "delivery";
export type PaymentMethod = "transfer" | "cash";
export type CashPaymentType = "exact" | "amount";

export type OrderItemPayload = {
  cartId: string;
  productId: string;
  title: string;
  category: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  selections: Record<string, string>;
  unitSelections: Record<string, string>[];
  removals: string[];
  unitRemovals: string[][];
  notes: string[];
};

export type CreateOrderPayload = {
  customerName: string;
  orderType: OrderType;
  address: string | null;
  paymentMethod: PaymentMethod;
  cashPaymentType: CashPaymentType | null;
  cashAmount: number | null;
  subtotal: number;
  deliveryFee: number;
  deliveryEstimateMin: number | null;
  deliveryEstimateMax: number | null;
  total: number;
  totalItems: number;
  whatsappMessage: string;
  items: OrderItemPayload[];
  metadata?: Record<string, unknown>;
};

type OrderInsert = {
  customer_name: string;
  order_type: OrderType;
  address: string | null;
  payment_method: PaymentMethod;
  cash_payment_type: CashPaymentType | null;
  cash_amount: number | null;
  subtotal: number;
  delivery_fee: number;
  delivery_estimate_min: number | null;
  delivery_estimate_max: number | null;
  total: number;
  total_items: number;
  whatsapp_message: string;
  items: OrderItemPayload[];
  metadata: Record<string, unknown>;
};

export async function createOrder(payload: CreateOrderPayload) {
  const order: OrderInsert = {
    customer_name: payload.customerName,
    order_type: payload.orderType,
    address: payload.address,
    payment_method: payload.paymentMethod,
    cash_payment_type: payload.cashPaymentType,
    cash_amount: payload.cashAmount,
    subtotal: payload.subtotal,
    delivery_fee: payload.deliveryFee,
    delivery_estimate_min: payload.deliveryEstimateMin,
    delivery_estimate_max: payload.deliveryEstimateMax,
    total: payload.total,
    total_items: payload.totalItems,
    whatsapp_message: payload.whatsappMessage,
    items: payload.items,
    metadata: payload.metadata ?? {},
  };

  const { error } = await supabase
    .from("orders")
    .insert(order);

  if (error) {
    throw error;
  }
}
