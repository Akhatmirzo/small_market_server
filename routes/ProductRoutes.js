const {
  addProduct,
  getProducts,
  getProduct,
  editProduct,
  deleteProduct
} = require("../controller/ProductController");
const auth = require("../middlewares/auth");

function ProductRoutes(fastify, options, done) {
  //* Add product
  fastify.post("/add", {
    preHandler: [auth(["user"])],
    schema: {
      tags: ["Product"],
      summary: "qwerty",
      headers: {
        authorization: {
          type: "string",
          description: "User token",
        },
      },
      body: {
        type: "object",
        properties: {
          code: { type: "string" },
          name: { type: "string" },
          imageUrl: { type: "string" },
          qty: { type: "number" },
          unit: { type: "string", default: `"kg", "dona", "qadoq", "m2"` },
        },
      },
      response: {
        201: {
          description: "Successful response",
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Product created successfully",
            },
            data: {
              type: "object",
              properties: {
                _id: { type: "string" },
                code: { type: "string" },
                name: { type: "string" },
                imageUrl: { type: "string" },
                qty: { type: "number" },
                unit: { type: "string" },
                adminId: { type: "string" },
              },
            },
          },
        },
        default: {
          description: "Default response",
          type: "object",
          properties: {
            foo: { type: "string" },
          },
        },
      },
    },
    handler: addProduct,
  });

  //* Get all products
  fastify.get("/", {
    preHandler: [auth(["user"])],
    schema: {
      tags: ["Product"],
      summary: "qwerty",
      headers: {
        authorization: {
          type: "string",
          description: "User token",
        },
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Found User Products",
            },
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  _id: { type: "string" },
                  code: { type: "string" },
                  name: { type: "string" },
                  imageUrl: { type: "string" },
                  qty: { type: "number" },
                  unit: { type: "string" },
                  adminId: { type: "string" },
                },
              },
            },
          },
        },
        default: {
          description: "Default response",
          type: "object",
          properties: {
            foo: { type: "string" },
          },
        },
      },
    },
    handler: getProducts,
  });

  //* Get One product
  fastify.get("/:id", {
    preHandler: [auth(["user"])],
    schema: {
      tags: ["Product"],
      summary: "qwerty",
      params: {
        id: { type: "string", description: "Product id" },
      },
      headers: {
        authorization: {
          type: "string",
          description: "User token",
        },
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Found User Product",
            },
            data: {
              type: "object",
              properties: {
                _id: { type: "string" },
                code: { type: "string" },
                name: { type: "string" },
                imageUrl: { type: "string" },
                qty: { type: "number" },
                unit: { type: "string" },
                adminId: { type: "string" },
              },
            },
          },
        },
        default: {
          description: "Default response",
          type: "object",
          properties: {
            foo: { type: "string" },
          },
        },
      },
    },
    handler: getProduct,
  });

  //* Update product
  fastify.put("/:id", {
    preHandler: [auth(["user"])],
    schema: {
      tags: ["Product"],
      summary: "qwerty",
      params: {
        id: { type: "string", description: "Product id" },
      },
      headers: {
        authorization: {
          type: "string",
          description: "User token",
        },
      },
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          imageUrl: { type: "string" },
          qty: { type: "number" },
          unit: { type: "string", default: `"kg", "dona", "qadoq", "m2"` },
        },
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Product Update success",
            },
          },
        },
        default: {
          description: "Default response",
          type: "object",
          properties: {
            foo: { type: "string" },
          },
        },
      },
    },
    handler: editProduct,
  });

  //* Delete product
  fastify.delete("/:id", {
    preHandler: [auth(["user"])],
    schema: {
      tags: ["Product"],
      summary: "qwerty",
      params: {
        id: { type: "string", description: "Product id" },
      },
      headers: {
        authorization: {
          type: "string",
          description: "User token",
        },
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Product Delete success",
            },
            data: {
              type: "object",
              properties: {
                _id: { type: "string" },
                code: { type: "string" },
                name: { type: "string" },
                imageUrl: { type: "string" },
                qty: { type: "number" },
                unit: { type: "string" },
                adminId: { type: "string" },
              },
            },
          },
        },
        default: {
          description: "Default response",
          type: "object",
          properties: {
            foo: { type: "string" },
          },
        },
      },
    },
    handler: deleteProduct,
  });

  done();
}

module.exports = ProductRoutes;
