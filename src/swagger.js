const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description:
        "REST API for the Udemy Node.js e-commerce application. Authenticated routes require a Bearer JWT obtained from `/api/v1/auth/login`.",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:8000",
        description: "API server",
      },
    ],
    tags: [
      { name: "Auth", description: "Authentication and password recovery" },
      { name: "Categories", description: "Product categories" },
      { name: "SubCategories", description: "Product sub-categories" },
      { name: "Brands", description: "Product brands" },
      { name: "Products", description: "Product catalog" },
      { name: "Reviews", description: "Product reviews" },
      { name: "Users", description: "User management" },
      { name: "Wishlist", description: "User wishlist" },
      { name: "User Address", description: "Shipping addresses" },
      { name: "Coupons", description: "Discount coupons" },
      { name: "Cart", description: "Shopping cart" },
      { name: "Orders", description: "Orders and checkout" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            status: { type: "string", example: "fail" },
            message: { type: "string", example: "Error message" },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "success" },
            data: { type: "object" },
          },
        },
        Signup: {
          type: "object",
          required: ["name", "email", "password", "confirmPassword"],
          properties: {
            name: { type: "string", example: "John Doe" },
            email: { type: "string", format: "email", example: "john@example.com" },
            password: { type: "string", minLength: 6, example: "password123" },
            confirmPassword: { type: "string", example: "password123" },
          },
        },
        Login: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", example: "john@example.com" },
            password: { type: "string", example: "password123" },
          },
        },
        ForgetPassword: {
          type: "object",
          required: ["email"],
          properties: {
            email: { type: "string", format: "email", example: "john@example.com" },
          },
        },
        VerifyResetCode: {
          type: "object",
          required: ["resetCode"],
          properties: {
            resetCode: { type: "string", example: "123456" },
          },
        },
        ResetPassword: {
          type: "object",
          required: ["email", "newPassword"],
          properties: {
            email: { type: "string", format: "email", example: "john@example.com" },
            newPassword: { type: "string", minLength: 6, example: "newpassword123" },
          },
        },
        Category: {
          type: "object",
          properties: {
            name: { type: "string", example: "Electronics" },
            image: { type: "string", example: "category-uuid.jpeg" },
          },
        },
        SubCategory: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", example: "Laptops" },
            category: { type: "string", example: "64a1b2c3d4e5f6789012345" },
          },
        },
        Brand: {
          type: "object",
          properties: {
            name: { type: "string", example: "Apple" },
            image: { type: "string", example: "brand-uuid.jpeg" },
          },
        },
        Product: {
          type: "object",
          required: ["title", "description", "quantity", "price", "imageCover", "category", "brand"],
          properties: {
            title: { type: "string", example: "MacBook Pro" },
            description: { type: "string", example: "High performance laptop" },
            quantity: { type: "number", example: 10 },
            price: { type: "number", example: 1999 },
            priceAfterDiscount: { type: "number", example: 1799 },
            colors: { type: "array", items: { type: "string" }, example: ["black", "silver"] },
            imageCover: { type: "string", example: "product-cover.jpeg" },
            images: { type: "array", items: { type: "string" } },
            category: { type: "string", example: "64a1b2c3d4e5f6789012345" },
            subCategories: {
              type: "array",
              items: { type: "string" },
              example: ["64a1b2c3d4e5f6789012346"],
            },
            brand: { type: "string", example: "64a1b2c3d4e5f6789012347" },
          },
        },
        Review: {
          type: "object",
          required: ["ratings", "title", "content"],
          properties: {
            ratings: { type: "number", minimum: 1, maximum: 5, example: 5 },
            title: { type: "string", example: "Great product" },
            content: { type: "string", example: "Exceeded my expectations." },
          },
        },
        User: {
          type: "object",
          properties: {
            name: { type: "string", example: "John Doe" },
            email: { type: "string", format: "email", example: "john@example.com" },
            password: { type: "string", example: "password123" },
            passwordConfirm: { type: "string", example: "password123" },
            phone: { type: "string", example: "+1234567890" },
            role: { type: "string", enum: ["user", "admin"], example: "user" },
          },
        },
        ChangePassword: {
          type: "object",
          required: ["currentPassword", "password", "passwordConfirm"],
          properties: {
            currentPassword: { type: "string", example: "oldpassword" },
            password: { type: "string", example: "newpassword123" },
            passwordConfirm: { type: "string", example: "newpassword123" },
          },
        },
        WishlistItem: {
          type: "object",
          required: ["productId"],
          properties: {
            productId: { type: "string", example: "64a1b2c3d4e5f6789012345" },
          },
        },
        UserAddress: {
          type: "object",
          properties: {
            alias: { type: "string", example: "Home" },
            details: { type: "string", example: "123 Main St" },
            phone: { type: "string", example: "+1234567890" },
            city: { type: "string", example: "New York" },
            postalCode: { type: "string", example: "10001" },
          },
        },
        Coupon: {
          type: "object",
          properties: {
            name: { type: "string", example: "SUMMER20" },
            expire: { type: "string", format: "date-time" },
            discount: { type: "number", example: 20 },
          },
        },
        CartItem: {
          type: "object",
          required: ["productId"],
          properties: {
            productId: { type: "string", example: "64a1b2c3d4e5f6789012345" },
            color: { type: "string", example: "black" },
          },
        },
        ApplyCoupon: {
          type: "object",
          required: ["coupon"],
          properties: {
            coupon: { type: "string", example: "SUMMER20" },
          },
        },
        UpdateCartQuantity: {
          type: "object",
          required: ["quantity"],
          properties: {
            quantity: { type: "number", minimum: 1, example: 2 },
          },
        },
        CashOrder: {
          type: "object",
          required: ["cartId", "shippingAddress"],
          properties: {
            cartId: { type: "string", example: "64a1b2c3d4e5f6789012345" },
            shippingAddress: {
              type: "object",
              properties: {
                details: { type: "string", example: "123 Main St" },
                phone: { type: "string", example: "+1234567890" },
                city: { type: "string", example: "New York" },
                postalCode: { type: "string", example: "10001" },
              },
            },
          },
        },
        CheckoutSession: {
          type: "object",
          required: ["cartId", "shippingAddress"],
          properties: {
            cartId: { type: "string", example: "64a1b2c3d4e5f6789012345" },
            shippingAddress: {
              type: "object",
              properties: {
                details: { type: "string", example: "123 Main St" },
                phone: { type: "string", example: "+1234567890" },
                city: { type: "string", example: "New York" },
                postalCode: { type: "string", example: "10001" },
              },
            },
          },
        },
        UpdateOrderStatus: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: ["pending", "processing", "shipped", "delivered"],
              example: "shipped",
            },
          },
        },
      },
      parameters: {
        MongoId: {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", pattern: "^[a-f\\d]{24}$" },
          description: "MongoDB ObjectId",
        },
        CategoryId: {
          name: "categoryId",
          in: "path",
          required: true,
          schema: { type: "string", pattern: "^[a-f\\d]{24}$" },
        },
        ProductId: {
          name: "productId",
          in: "path",
          required: true,
          schema: { type: "string", pattern: "^[a-f\\d]{24}$" },
        },
        Page: {
          name: "page",
          in: "query",
          schema: { type: "integer", default: 1 },
        },
        Limit: {
          name: "limit",
          in: "query",
          schema: { type: "integer", default: 10 },
        },
      },
      responses: {
        Unauthorized: {
          description: "Missing or invalid JWT",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        Forbidden: {
          description: "Insufficient permissions",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        NotFound: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, "docs/swagger.docs.js")],
};

module.exports = swaggerJsdoc(options);
