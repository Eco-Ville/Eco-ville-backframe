import { createHandler, createServer } from "@backframe/rest";

const server = createServer({
  port: 8989,
  logRequests: true,

});

export default server;
