/**
 * @openapi
 * /api/v1/care_products/{product_id}:
 *   get:
 *     summary: Get care product detail
 *     tags: [Care Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 4a00e571-a165-4fe3-a929-e02ef7886f00
 *         description: Care product ID
 *     responses:
 *       200:
 *         description: Get care product successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get care product successful }
 *                 data:
 *                   type: object
 *                   properties:
 *                     id: { type: string, format: uuid, example: 4a00e571-a165-4fe3-a929-e02ef7886f00 }
 *                     product_name: { type: string, example: Awesome Metal Hat }
 *                     brand: { type: string, example: Hammes and Sons }
 *                     product_category: { type: string, example: never }
 *                     product_type: { type: string, example: consequently }
 *                     ingredients: { type: string, nullable: true, example: null }
 *                     key_ingredients: { type: array, items: { type: string }, nullable: true, example: null }
 *                     alcohol_free: { type: boolean, example: true }
 *                     fragrance_free: { type: boolean, example: true }
 *                     paraben_free: { type: boolean, example: false }
 *                     recommended_for: { type: string, example: combination }
 *                     suitable_skin: { type: string, example: acne-prone }
 *                     created_at: { type: string, format: date-time, example: 2026-02-14T12:47:36.067Z }
 *                     updated_at: { type: string, format: date-time, example: 2026-02-14T12:47:36.067Z }
 *                     usage_instruction: { type: string, example: Compello supellex vorago tenuis. Defungo utique carbo crebro tumultus. }
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           user:
 *                             type: object
 *                             properties:
 *                               username: { type: string, example: Lelah47 }
 *                           comment_body: { type: string, example: Perferendis admoveo voluptas. }
 *                           created_at: { type: string, format: date-time, example: 2026-02-14T12:47:37.907Z }
 *                     likes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           user:
 *                             type: object
 *                             properties:
 *                               username: { type: string, example: Junius22 }
 *                     creator:
 *                       type: object
 *                       properties:
 *                         id: { type: string, format: uuid, example: 7b1904ba-4888-4a84-848d-adc7f88e0010 }
 *                         username: { type: string, example: Pascale11 }
 *                     _count:
 *                       type: object
 *                       properties:
 *                         inventories: { type: integer, example: 3 }
 *                         comments: { type: integer, example: 2 }
 *                         likes: { type: integer, example: 3 }
 *       404:
 *         description: Care product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Care product not found }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Something went wrong }
 */