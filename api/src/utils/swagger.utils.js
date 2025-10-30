import swaggerJsdoc from "swagger-jsdoc";

// Swagger config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pokedex API",
      version: "1.0.0",
      description: "Pokemon teams manager API",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Development server ",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

export const specs = swaggerJsdoc(options);
