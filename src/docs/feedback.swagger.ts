/**
 * @openapi
 * /api/v1/feedbacks:
 *   get:
 *     summary: Get feedback list
 *     tags: [Feedback]
 *     responses:
 *       200:
 *         description: Get feedback successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get feedback successful }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string, format: uuid, example: 6c05680c-624b-47b3-bb34-e0e49f320a2d }
 *                       feedback_rate: { type: integer, example: 5 }
 *                       feedback_note: { type: string, example: Cinis absum vinco. }
 *                       created_at: { type: string, format: date-time, example: 2026-02-14T12:47:37.813Z }
 *                       user:
 *                         type: object
 *                         properties:
 *                           username: { type: string, example: Carmella.Lubowitz16 }
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page: { type: integer, example: 1 }
 *                     limit: { type: integer, example: 14 }
 *                     total: { type: integer, example: 15 }
 *                     total_page: { type: integer, example: 2 }
 *       404:
 *         description: Feedback not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Feedback not found }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Something went wrong }
 */