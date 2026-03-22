/**
 * @openapi
 * /api/v1/inventories:
 *   get:
 *     summary: Get inventory list
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get inventory successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get inventory successful }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string, format: uuid, example: 8f523dc2-fbf0-4087-bff2-a8831c24663f }
 *                       product_name: { type: string, example: Hydrating Gel Cleanser }
 *                       brand: { type: string, example: SkinLabs }
 *                       product_category: { type: string, example: cleanser }
 *                       product_type: { type: string, example: gel }
 *                       key_ingredients: { type: array, items: { type: string }, nullable: true, example: ["Niacinamide", "Glycerin"] }
 *                       recommended_for: { type: string, example: Daily facial cleansing }
 *                       suitable_skin: { type: string, example: All skin types }
 *                       created_at: { type: string, format: date-time, example: 2026-02-14T13:38:19.608Z }
 *                       inventories:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id: { type: string, format: uuid, example: 1b8677b0-2201-49d7-bc84-7930ccc5a61b }
 *                             inventory_note: { type: string, nullable: true, example: 123 }
 *                             _count:
 *                               type: object
 *                               properties:
 *                                 used_schedules: { type: integer, example: 0 }
 *                             used_schedules:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   day_name: { type: string, example: sat }
 *                                   time: { type: string, example: night }
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page: { type: integer, example: 1 }
 *                     limit: { type: integer, example: 14 }
 *                     total: { type: integer, example: 9 }
 *                     total_page: { type: integer, example: 1 }
 *       404:
 *         description: Inventory not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Inventory not found }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Something went wrong }
 */