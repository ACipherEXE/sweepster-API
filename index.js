const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("hotels.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || process.env.HTTP_PLATFORM_PORT || 8080; //  chose port from here like 8080, 3001

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(port);
  console.log(port);
});
