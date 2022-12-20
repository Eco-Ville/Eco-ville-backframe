import { createHandler, z } from "@backframe/rest";
import { prisma } from "../../db.js";
const POST = createHandler({
  input: z.object({
    feedback: z.string()
  }),
  async action(context) {
    const { feedback } = context.input;
    try {
      const review = await prisma.feedback.create({
        data: {
          feedback
        }
      });
      context.json({ message: "Feedback submitted successfully", feedback });
    } catch (e) {
      context.json({ message: e.message });
    }
  }
});
const GET = createHandler({
  async action(context) {
    try {
      const feedback = await prisma.feedback.findMany();
      context.json({ message: "Feedback fetched successfully", feedback });
    } catch (e) {
      context.json({ message: e.message });
    }
  }
});
export {
  GET,
  POST
};
