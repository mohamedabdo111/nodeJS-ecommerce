/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Signup'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login and receive JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */

/**
 * @swagger
 * /api/v1/auth/forgetPassword:
 *   post:
 *     tags: [Auth]
 *     summary: Request a password reset code via email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgetPassword'
 *     responses:
 *       200:
 *         description: Reset code sent to email
 */

/**
 * @swagger
 * /api/v1/auth/verifyResetCode:
 *   post:
 *     tags: [Auth]
 *     summary: Verify the password reset code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyResetCode'
 *     responses:
 *       200:
 *         description: Reset code verified
 */

/**
 * @swagger
 * /api/v1/auth/resetPassword:
 *   post:
 *     tags: [Auth]
 *     summary: Reset password after code verification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
 *     responses:
 *       200:
 *         description: Password reset successfully
 */

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     tags: [Categories]
 *     summary: Get all categories
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *   post:
 *     tags: [Categories]
 *     summary: Create a category (admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, image]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Category created
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Get a single category
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     responses:
 *       200:
 *         description: Category details
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     tags: [Categories]
 *     summary: Update a category (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Category updated
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *   delete:
 *     tags: [Categories]
 *     summary: Delete a category (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     responses:
 *       204:
 *         description: Category deleted
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/categories/{categoryId}/subCategories:
 *   get:
 *     tags: [SubCategories]
 *     summary: Get sub-categories for a category
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryId'
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *     responses:
 *       200:
 *         description: List of sub-categories
 *   post:
 *     tags: [SubCategories]
 *     summary: Create a sub-category under a category (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategory'
 *     responses:
 *       201:
 *         description: Sub-category created
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/categories/{categoryId}/subCategories/{id}:
 *   get:
 *     tags: [SubCategories]
 *     summary: Get a single sub-category
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryId'
 *       - $ref: '#/components/parameters/MongoId'
 *     responses:
 *       200:
 *         description: Sub-category details
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     tags: [SubCategories]
 *     summary: Update a sub-category (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryId'
 *       - $ref: '#/components/parameters/MongoId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategory'
 *     responses:
 *       200:
 *         description: Sub-category updated
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *   delete:
 *     tags: [SubCategories]
 *     summary: Delete a sub-category (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryId'
 *       - $ref: '#/components/parameters/MongoId'
 *     responses:
 *       204:
 *         description: Sub-category deleted
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/subCategories:
 *   get:
 *     tags: [SubCategories]
 *     summary: Get all sub-categories
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *     responses:
 *       200:
 *         description: List of sub-categories
 *   post:
 *     tags: [SubCategories]
 *     summary: Create a sub-category (admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategory'
 *     responses:
 *       201:
 *         description: Sub-category created
 */

/**
 * @swagger
 * /api/v1/subCategories/{id}:
 *   get:
 *     tags: [SubCategories]
 *     summary: Get a single sub-category
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     responses:
 *       200:
 *         description: Sub-category details
 *   put:
 *     tags: [SubCategories]
 *     summary: Update a sub-category (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategory'
 *     responses:
 *       200:
 *         description: Sub-category updated
 *   delete:
 *     tags: [SubCategories]
 *     summary: Delete a sub-category (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     responses:
 *       204:
 *         description: Sub-category deleted
 */

/**
 * @swagger
 * /api/v1/brands:
 *   get:
 *     tags: [Brands]
 *     summary: Get all brands
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *     responses:
 *       200:
 *         description: List of brands
 *   post:
 *     tags: [Brands]
 *     summary: Create a brand (admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, image]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Apple
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Brand created
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/brands/{id}:
 *   get:
 *     tags: [Brands]
 *     summary: Get a single brand
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     responses:
 *       200:
 *         description: Brand details
 *   put:
 *     tags: [Brands]
 *     summary: Update a brand (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Brand updated
 *   delete:
 *     tags: [Brands]
 *     summary: Delete a brand (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     responses:
 *       204:
 *         description: Brand deleted
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     tags: [Products]
 *     summary: Get all products
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *       - name: keyword
 *         in: query
 *         schema:
 *           type: string
 *         description: Search by title
 *       - name: category
 *         in: query
 *         schema:
 *           type: string
 *       - name: price[gte]
 *         in: query
 *         schema:
 *           type: number
 *       - name: price[lte]
 *         in: query
 *         schema:
 *           type: number
 *       - name: sort
 *         in: query
 *         schema:
 *           type: string
 *           example: price
 *     responses:
 *       200:
 *         description: List of products
 *   post:
 *     tags: [Products]
 *     summary: Create a product (admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, description, quantity, price, imageCover, category, brand]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *               priceAfterDiscount:
 *                 type: number
 *               colors:
 *                 type: array
 *                 items:
 *                   type: string
 *               imageCover:
 *                 type: string
 *                 format: binary
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               category:
 *                 type: string
 *               subCategories:
 *                 type: array
 *                 items:
 *                   type: string
 *               brand:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get a single product
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     tags: [Products]
 *     summary: Update a product (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *               imageCover:
 *                 type: string
 *                 format: binary
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Product updated
 *   delete:
 *     tags: [Products]
 *     summary: Delete a product (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     responses:
 *       204:
 *         description: Product deleted
 */

/**
 * @swagger
 * /api/v1/products/{productId}/reviews:
 *   get:
 *     tags: [Reviews]
 *     summary: Get reviews for a product
 *     parameters:
 *       - $ref: '#/components/parameters/ProductId'
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *     responses:
 *       200:
 *         description: List of reviews
 *   post:
 *     tags: [Reviews]
 *     summary: Create a review for a product (user)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ProductId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review created
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/reviews:
 *   get:
 *     tags: [Reviews]
 *     summary: Get all reviews
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *     responses:
 *       200:
 *         description: List of reviews
 */

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   put:
 *     tags: [Reviews]
 *     summary: Update a review (user)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review updated
 *   delete:
 *     tags: [Reviews]
 *     summary: Delete a review (user)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     responses:
 *       204:
 *         description: Review deleted
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *   post:
 *     tags: [Users]
 *     summary: Create a user (admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *               phone:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *               profileImg:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User created
 */

/**
 * @swagger
 * /api/v1/users/getMe:
 *   get:
 *     tags: [Users]
 *     summary: Get logged-in user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/users/changeMyPassword:
 *   put:
 *     tags: [Users]
 *     summary: Change password for logged-in user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePassword'
 *     responses:
 *       200:
 *         description: Password updated
 */

/**
 * @swagger
 * /api/v1/users/updateMyData:
 *   put:
 *     tags: [Users]
 *     summary: Update logged-in user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               profileImg:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated
 */

/**
 * @swagger
 * /api/v1/users/changePassword/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Change password for a user (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePassword'
 *     responses:
 *       200:
 *         description: Password updated
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get a user by ID (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     responses:
 *       200:
 *         description: User details
 *   put:
 *     tags: [Users]
 *     summary: Update a user (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               role:
 *                 type: string
 *               profileImg:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     responses:
 *       204:
 *         description: User deleted
 */

/**
 * @swagger
 * /api/v1/wishlist:
 *   get:
 *     tags: [Wishlist]
 *     summary: Get wishlist for logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User wishlist
 *   post:
 *     tags: [Wishlist]
 *     summary: Add product to wishlist
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WishlistItem'
 *     responses:
 *       200:
 *         description: Product added to wishlist
 */

/**
 * @swagger
 * /api/v1/wishlist/{productId}:
 *   delete:
 *     tags: [Wishlist]
 *     summary: Remove product from wishlist
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed from wishlist
 */

/**
 * @swagger
 * /api/v1/userAddress:
 *   get:
 *     tags: [User Address]
 *     summary: Get all addresses for logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of addresses
 *   post:
 *     tags: [User Address]
 *     summary: Add a new address
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAddress'
 *     responses:
 *       201:
 *         description: Address created
 */

/**
 * @swagger
 * /api/v1/userAddress/{id}:
 *   put:
 *     tags: [User Address]
 *     summary: Update an address
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAddress'
 *     responses:
 *       200:
 *         description: Address updated
 *   delete:
 *     tags: [User Address]
 *     summary: Remove an address
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     responses:
 *       200:
 *         description: Address removed
 */

/**
 * @swagger
 * /api/v1/coupons:
 *   get:
 *     tags: [Coupons]
 *     summary: Get all coupons
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of coupons
 *   post:
 *     tags: [Coupons]
 *     summary: Create a coupon
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coupon'
 *     responses:
 *       201:
 *         description: Coupon created
 */

/**
 * @swagger
 * /api/v1/coupons/{id}:
 *   get:
 *     tags: [Coupons]
 *     summary: Get a single coupon
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     responses:
 *       200:
 *         description: Coupon details
 *   put:
 *     tags: [Coupons]
 *     summary: Update a coupon
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coupon'
 *     responses:
 *       200:
 *         description: Coupon updated
 *   delete:
 *     tags: [Coupons]
 *     summary: Delete a coupon
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     responses:
 *       204:
 *         description: Coupon deleted
 */

/**
 * @swagger
 * /api/v1/cart:
 *   get:
 *     tags: [Cart]
 *     summary: Get logged-in user cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart contents
 *   post:
 *     tags: [Cart]
 *     summary: Add product to cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       200:
 *         description: Product added to cart
 *   delete:
 *     tags: [Cart]
 *     summary: Clear the entire cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared
 */

/**
 * @swagger
 * /api/v1/cart/applyCoupon:
 *   post:
 *     tags: [Cart]
 *     summary: Apply a coupon to the cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApplyCoupon'
 *     responses:
 *       200:
 *         description: Coupon applied
 */

/**
 * @swagger
 * /api/v1/cart/{cartItemId}:
 *   put:
 *     tags: [Cart]
 *     summary: Update cart item quantity
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: cartItemId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCartQuantity'
 *     responses:
 *       200:
 *         description: Quantity updated
 *   delete:
 *     tags: [Cart]
 *     summary: Remove a specific item from cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: cartItemId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed
 */

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     tags: [Orders]
 *     summary: Get all orders (user sees own, admin sees all)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *     responses:
 *       200:
 *         description: List of orders
 *   post:
 *     tags: [Orders]
 *     summary: Create a cash order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CashOrder'
 *     responses:
 *       201:
 *         description: Order created
 */

/**
 * @swagger
 * /api/v1/orders/create-checkout-session:
 *   post:
 *     tags: [Orders]
 *     summary: Create a Stripe checkout session
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CheckoutSession'
 *     responses:
 *       200:
 *         description: Checkout session URL returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 session:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       example: https://checkout.stripe.com/...
 */

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Get a specific order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     responses:
 *       200:
 *         description: Order details
 *   put:
 *     tags: [Orders]
 *     summary: Mark order as paid (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     responses:
 *       200:
 *         description: Order marked as paid
 */

/**
 * @swagger
 * /api/v1/orders/status/{id}:
 *   put:
 *     tags: [Orders]
 *     summary: Update order shipping status (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderStatus'
 *     responses:
 *       200:
 *         description: Order status updated
 */
