/**
 * @openapi
 * /api/v1/schedule_marks:
 *   get:
 *     summary: Get schedule mark list
 *     tags: [Schedule Mark]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get schedule mark successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get schedule mark successful }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string, format: uuid, example: 2e2418b7-d6ae-49fc-a0ac-146e4f81ba3d }
 *                       created_at: { type: string, format: date-time, example: 2026-02-14T12:47:37.704Z }
 *                       used_schedule:
 *                         type: object
 *                         properties:
 *                           day_name: { type: string, example: mon }
 *                           time: { type: string, example: afternoon }
 *                           schedule_note: { type: string, nullable: true, example: "lorem ipsum" }
 *                           inventory:
 *                             type: object
 *                             properties:
 *                               id: { type: string, format: uuid, example: 6403e4e6-6ef8-4f40-8dd4-c78ea189ac75 }
 *                               inventory_note: { type: string, nullable: true, example: Arguo conor angulus tego corona itaque validus. }
 *                               care_product:
 *                                 type: object
 *                                 properties:
 *                                   product_name: { type: string, example: Oriental Ceramic Fish }
 *                                   product_category: { type: string, example: extremely }
 *                                   product_type: { type: string, example: drat }
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page: { type: integer, example: 1 }
 *                     limit: { type: integer, example: 14 }
 *                     total: { type: integer, example: 13 }
 *                     total_page: { type: integer, example: 1 }
 *       404:
 *         description: Schedule mark not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Schedule mark not found }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Something went wrong }
 */