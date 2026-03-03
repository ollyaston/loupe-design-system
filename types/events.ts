export type FailureType =
  | "validation"
  | "product"
  | "customer"
  | "order"
  | "order_line"
  | "post_actions";

export interface RecordedEvent {
  _id?: string;
  createdAt?: string;
  created_at?: string; // API returns snake_case for some events
  agent_id?: string;
  external_agent_id?: string;
  customer_id?: string;
  external_customer_id?: string;
  internal_customer_id?: string;
  event_name?: string;
  data?: unknown;
  status?: "success" | "failed";
  idempotency_key?: string;
  failure_reason?: string;
  failure_type?: FailureType;
  failed_at?: string;
  replayed_at?: string;
  cost?: { amount?: number };
}
