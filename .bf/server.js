import { createServer } from "@backframe/rest";
const server = createServer({
  port: 8989
});
var server_default = server;
export {
  server_default as default
};
