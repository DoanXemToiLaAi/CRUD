const express = require("express");
require("dotenv").config();
const dbConnect = require("./Config/dbconnect");
const initRoutes = require("./Routes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = process.env.PORT;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());

// Connect to the database
dbConnect();

// Initialize routes
initRoutes(app);

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Quản lý người dùng",
      version: "1.0.0",
      description: "API đơn giản để quản lý người dùng",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./Models/*.js", "./Routes/*.js"],
};

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Default route
app.use("/", (req, res) => {
  res.send("SERVER is Online");
});

// Start the server
app.listen(port, () => {
  console.log("SERVER RUNNING ON THE " + port);
});
