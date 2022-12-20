import { createHandler, z } from "@backframe/rest";
import { prisma } from "../../db.js";

export const POST = createHandler({
  input: z.object({
    feedback: z.string(),
  }),
  async action(context) {
    const { feedback } = context.input;
    try {
      const review = await prisma.feedback.create({
        data: {
          feedback: feedback,
        },
      });
      context.json({
        message: "Feedback submitted successfully",
        feedback: feedback,
      });
    } catch (e) {
      context.json({ message: e.message });
    }
  },
});

export const GET = createHandler({
  async action(context) {
    try {
      const feedback = await prisma.feedback.findMany();
      context.json({
        message: "Feedback fetched successfully",
        feedback: feedback,
      });
    } catch (e) {
      context.json({ message: e.message });
    }
  },
});
