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
  },
  apis: ["./src/routes/*.js"],
};

export const specs = swaggerJsdoc(options);
