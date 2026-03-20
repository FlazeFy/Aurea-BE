/**
 * @openapi
 * /api/v1/likes/{product_id}:
 *   get:
 *     summary: Get like by product id
 *     tags: [Like]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 2750600e-ac6e-4b45-8520-dd926f2b8886
 *     responses:
 *       200:
 *         description: Get like successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get like successful }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: object
 *                         properties:
 *                           username: { type: string, example: Guadalupe74 }
 *                           id: { type: string, format: uuid, example: b3bf28fe-d9bf-4506-872b-6afa90f423fa }
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page: { type: integer, example: 1 }
 *                     limit: { type: integer, example: 25 }
 *                     total: { type: integer, example: 1 }
 *                     total_page: { type: integer, example: 1 }
 *       404:
 *         description: Like not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Like not found }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Something went wrong }
 */