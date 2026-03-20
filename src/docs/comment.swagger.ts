/**
 * @openapi
 * /api/v1/comments/{product_id}:
 *   get:
 *     summary: Get comment by product id
 *     tags: [Comment]
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
 *         description: Get comment successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get comment successful }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       comment_body: { type: string, example: Aureus spectaculum ambulo despecto vestrum ascit tribuo avaritia tepidus. Amplus celer temporibus vorax. }
 *                       created_at: { type: string, format: date-time, example: 2026-02-14T12:47:38.277Z }
 *                       user:
 *                         type: object
 *                         properties:
 *                           username: { type: string, example: Olga.Kassulke }
 *                           id: { type: string, format: uuid, example: e0ac4484-be94-45bd-8de3-18592d417a0e }
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page: { type: integer, example: 1 }
 *                     limit: { type: integer, example: 14 }
 *                     total: { type: integer, example: 4 }
 *                     total_page: { type: integer, example: 1 }
 *       404:
 *         description: Comment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Comment not found }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Something went wrong }
 */