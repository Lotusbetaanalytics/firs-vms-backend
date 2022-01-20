const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'FIRS-VMS API',
    description: 'A visitor management system api',
  },
  host: 'firs-vms-backend.herokuapp.com',
  schemes: ['https', 'http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
    './Routes/user',
    './Routes/prebook',
    './Routes/authentication',
    './Routes/logs',
];
// const endpointsFiles = [
//     './app.js'
// ];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

// swaggerAutogen(outputFile, endpointsFiles, doc);
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app')           // Your project's root file
})