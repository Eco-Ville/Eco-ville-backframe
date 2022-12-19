import { createHandler } from "@backframe/rest";
const GET = createHandler({
  action() {
    return "Hello World!!!";
  }
});
export {
  GET
};
