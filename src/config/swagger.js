const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SuperLabs E-commerce API',
      version: '1.0.0',
      description: 'API documentation for the SuperLabs Product Listing and Admin management task.',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      {
        url: 'https://superlabs-backend-z0k1.onrender.com',
        description: 'Production server',
      },
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            sku: { type: 'string', example: 'PROD-001' },
            name: { type: 'string', example: 'High-Performance Laptop' },
            description: { type: 'string', example: 'A powerful laptop for developers.' },
            price: { type: 'number', example: 1200.00 },
            discountedPrice: { type: 'number', nullable: true, example: 1000.00 },
            stock: { type: 'integer', example: 50 },
            category: { type: 'string', example: 'Electronics' },
            images: { type: 'string', description: 'Stringified JSON array of image URLs', example: '["https://example.com/img1.jpg"]' },
            availability: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            reviews: {
              type: 'array',
              items: { $ref: '#/components/schemas/Review' }
            }
          }
        },
        Review: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            productId: { type: 'integer', example: 1 },
            rating: { type: 'integer', example: 5 },
            comment: { type: 'string', example: 'Great product!' },
            reviewerName: { type: 'string', example: 'John Doe' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = specs;
