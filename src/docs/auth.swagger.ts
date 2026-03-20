/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Login account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email, example: flazen.edu@gmail.com }
 *               password: { type: string, format: password, example: nopass123 }
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Login successful }
 *                 data:
 *                   type: object
 *                   properties:
 *                     name: { type: string, example: Jacky_Heaney }
 *                     email: { type: string, format: email, example: flazen.edu@gmail.com }
 *                     role: { type: string, example: user }
 *                     token: { type: string, example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 }
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Invalid email or password }
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
 *                     password: { type: string, example: password must be at least 6 characters }
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
 * /api/v1/auth/refresh-token:
 *   get:
 *     summary: Refresh token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Token refreshed successfully }
 *                 data:
 *                   type: object
 *                   properties:
 *                     name: { type: string, example: Jacky_Heaney }
 *                     email: { type: string, format: email, example: flazen.edu@gmail.com }
 *                     role: { type: string, example: user }
 *                     token: { type: string, example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Invalid refresh token }
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
 * /api/v1/auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get user successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Get user successful }
 *                 data:
 *                   type: object
 *                   properties:
 *                     id: { type: string, format: uuid, example: 012ae585-05b8-4fdc-95f4-8cc3c3166846 }
 *                     username: { type: string, example: Jacky_Heaney }
 *                     email: { type: string, format: email, example: flazen.edu@gmail.com }
 *                     telegram_user_id: { type: string, nullable: true, example: null }
 *                     telegram_is_valid: { type: boolean, example: false }
 *                     bio: { type: string, example: Capillus pecto vulnero acidus pecco adeptio ademptio tener. Triduana socius deputo avaritia modi. }
 *                     profile_image: { type: string, nullable: true, example: null }
 *                     born_at: { type: string, format: date-time, example: 1988-07-15T00:00:00.000Z }
 *                     gender: { type: string, example: male }
 *                     created_at: { type: string, format: date-time, example: 2026-02-14T12:47:34.078Z }
 *                     updated_at: { type: string, format: date-time, example: 2026-02-14T12:47:34.078Z }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Something went wrong }
 */