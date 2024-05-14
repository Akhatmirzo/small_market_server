const dotenv = require("dotenv");
dotenv.config();
const cron = require("node-cron");
const fastify = require("fastify")();
const cors = require("@fastify/cors");
const multipart = require("@fastify/multipart");
fastify.register(cors);
fastify.register(multipart);
fastify.register(require("@fastify/swagger"), {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "MarketPlace API Documentation",
      description: "This is a MarletPlace platform's API list!",
      version: "1.0.0",
    },
    tags: [
      { name: "API", description: "Test related end-points" },
    ],
    securityDefinitions: {
      apiKey: {
        type: "apiKey",
        name: "apiKey",
        in: "header",
      },
    },
  },
});

const mongoose = require("mongoose");

fastify.get("/", { schema: { tags: ["API"] } }, (req, res) => {
  res.send("Api is working");
});

fastify.register(require("./routes/UserRoutes"), {
    prefix: "/api/user",
})

fastify.register(require("./routes/ProductRoutes"), {
  prefix: "/api/product",
})

//* Database connection
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log("Global db connected");
});

fastify.addHook("onClose", async () => {
  await mongoose.connection.close();
});

fastify.listen(3000, "0.0.0.0", (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server is running on port 3000`);
});