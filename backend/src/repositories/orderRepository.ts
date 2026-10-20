import { Order, OrderStatus } from '../../../shared/types';
import { mockOrders } from '../data/mockOrders';

/**
 * Data access layer for orders.
 * Routes depend on this module instead of the data source directly, so swapping
 * the in-memory mock data for a real database only requires changes here.
 */

// Deep copy so in-memory mutations never leak back into the mock data module
const orders: Order[] = structuredClone(mockOrders);

export interface OrderFilter {
  status?: OrderStatus;
}

/**
 * Returns orders matching the filter, newest first.
 * Async to match a real database client, so callers won't change when the data source does.
 */
export const findAllOrders = async (filter: OrderFilter = {}): Promise<Order[]> =>
  orders
    .filter((order) => filter.status === undefined || order.status === filter.status)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
