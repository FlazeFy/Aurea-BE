/**
 * @openapi
 * /api/v1/used_schedules/{day}:
 *   get:
 *     summary: Get used schedule by day
 *     tags: [Used Schedule]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: day
 *         required: true
 *         schema:
 *           type: string
 *           example: thu
 *         description: Day name (e.g., mon, tue, wed, thu, fri, sat, sun)
 *     responses:
 *       200:
 *         description: Get used schedule successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get used schedule successful }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string, format: uuid, example: 05ff0a4e-dc20-419b-9e11-3eaf17bd9993 }
 *                       time: { type: string, example: afternoon }
 *                       inventory:
 *                         type: object
 *                         properties:
 *                           id: { type: string, format: uuid, example: 2261eeba-2e9b-44e0-ae73-6956bbb88b8f }
 *                           care_product:
 *                             type: object
 *                             properties:
 *                               product_name: { type: string, example: Unbranded Granite Hat }
 *                               product_type: { type: string, example: mid }
 *                               product_category: { type: string, example: unless }
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Validation error }
 *                 data:
 *                   type: object
 *                   properties:
 *                     day: { type: string, example: "day must be one of: sun, mon, tue, wed, thu, fri, sat" }
 *       404:
 *         description: Used schedule not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Used schedule not found }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Something went wrong }
 */

/**
 * @openapi
 * /api/v1/used_schedules:
 *   get:
 *     summary: Get all used schedules
 *     tags: [Used Schedule]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get used schedule successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get used schedule successful }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string, format: uuid, example: 9c92555a-b388-43f5-8429-5f64d9d96637 }
 *                       time: { type: string, example: afternoon }
 *                       day_name: { type: string, example: mon }
 *                       inventory:
 *                         type: object
 *                         properties:
 *                           id: { type: string, format: uuid, example: 6403e4e6-6ef8-4f40-8dd4-c78ea189ac75 }
 *                           care_product:
 *                             type: object
 *                             properties:
 *                               product_name: { type: string, example: Oriental Ceramic Fish }
 *                               product_type: { type: string, example: drat }
 *                               product_category: { type: string, example: extremely }
 *       404:
 *         description: Used schedule not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Used schedule not found }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Something went wrong }
 */