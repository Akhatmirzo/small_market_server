const { registerUser, loginUser } = require("../controller/UserController");

function UserRoutes(fastify, options, done) {
  //* Register user
  fastify.post("/register", {
    schema: {
      tags: ["User"],
      summary: "qwerty",
      body: {
        type: "object",
        properties: {
          username: { type: "string" },
          password: { type: "string" },
        },
      },
      response: {
        201: {
          description: "Successful response",
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "User created successfully",
            },
            token: { type: "string", description: "User token" },
            data: {
              type: "object",
              properties: {
                _id: { type: "string" },
                username: { type: "string" },
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
    handler: registerUser,
  });

  //* Login admin
  fastify.post("/login", {
    schema: {
      tags: ["User"],
      summary: "qwerty",
      body: {
        type: "object",
        properties: {
          username: { type: "string" },
          password: { type: "string" },
        },
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "User authentication successfully",
            },
            token: { type: "string", description: "User token" },
            data: {
              type: "object",
              properties: {
                _id: { type: "string" },
                username: { type: "string" },
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
    handler: loginUser,
  });

  done();
}

module.exports = UserRoutes;
