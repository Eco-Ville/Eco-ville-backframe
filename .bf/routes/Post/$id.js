import { InternalException, createHandler } from "@backframe/rest";
import { prisma } from "../../db.js";
const GET = createHandler({
  async action(context) {
    try {
      const id = context.params.id;
      const post = await prisma.post.findMany({
        where: {
          type: id
        }
      });
      context.json({
        message: "Post fetched",
        post
      });
    } catch (e) {
      context.json(InternalException(e.message));
    }
  }
});
export {
  GET
};
