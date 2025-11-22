const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'University Management System API',
    description: 'University Management System API'
  },
  host: 'localhost:8080',
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);