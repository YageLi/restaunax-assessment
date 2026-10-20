import { Router, Request, Response, NextFunction } from 'express';
import { ApiError, ApiResponse, Order, ORDER_STATUSES } from '../../../shared/types';
import { findAllOrders } from '../repositories/orderRepository';
import { isOrderStatus } from '../validation/orders';

const router = Router();

/**
 * GET /api/orders
 * List all orders (newest first), optionally filtered by status
 * Query params: ?status=pending (optional)
 *
 * 200 - ApiResponse<Order[]>
 * 400 - ApiError when status is not a valid OrderStatus
 */
router.get('/', async (req: Request, res: Response<ApiResponse<Order[]> | ApiError>, next: NextFunction) => {
  try {
    const { status } = req.query;

    if (status !== undefined && !isOrderStatus(status)) {
      res.status(400).json({
        error: 'Invalid status',
        message: `status must be one of: ${ORDER_STATUSES.join(', ')}`,
      });
      return;
    }

    res.json({ data: await findAllOrders({ status }) });
  } catch (err) {
    // Express 4 doesn't catch rejected promises, so forward errors to the error handler
    next(err);
  }
});

/**
 * GET /api/orders/:id
 * Get a specific order by ID
 */
router.get('/:id', (_req: Request, res: Response) => {
  // TODO: Implement this endpoint
  // 1. Extract the order ID from params
  // 2. Find the order in your data store
  // 3. Return 404 if not found, or the order if found

  res.status(501).json({ error: 'Not implemented yet' });
});

/**
 * POST /api/orders
 * Create a new order
 */
router.post('/', (_req: Request, res: Response) => {
  // TODO: Implement this endpoint
  // 1. Validate the request body
  // 2. Generate a unique ID for the new order
  // 3. Add createdAt timestamp
  // 4. Save to your data store
  // 5. Return the created order with 201 status

  res.status(501).json({ error: 'Not implemented yet' });
});

/**
 * PATCH /api/orders/:id
 * Update an order's status
 */
router.patch('/:id', (_req: Request, res: Response) => {
  // TODO: Implement this endpoint
  // 1. Extract order ID from params
  // 2. Validate the new status from request body
  // 3. Find the order and update its status
  // 4. Return 404 if order not found
  // 5. Return the updated order

  res.status(501).json({ error: 'Not implemented yet' });
});

export default router;
