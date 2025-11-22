const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'University Management System API',
    description: 'University Management System API'
  },
  host: 'https://university-management-system-b55v.onrender.com',
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);