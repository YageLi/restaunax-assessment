import { ORDER_STATUSES, OrderStatus } from '../../../shared/types';

/**
 * Type guard for untrusted input (query params, request bodies).
 * Accepts `unknown` because Express query values can be strings, arrays or nested objects.
 */
export const isOrderStatus = (value: unknown): value is OrderStatus =>
  typeof value === 'string' && (ORDER_STATUSES as readonly string[]).includes(value);
