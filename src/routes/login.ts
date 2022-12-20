import { createHandler, z } from "@backframe/rest";
import { hashSync } from "bcrypt";
import { prisma } from "../db.js";
import { createToken } from "../auth.js";
import bcrypt from "bcrypt";

export const POST = createHandler({
  input: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  async action(context) {
    const { email, password } = context.input;

    try {
      const user = await prisma.user.findUnique({
        where: {
          contactEmail: email,
        },
      });

      const isValid = await bcrypt.compare(password, user!.password);

      if (!isValid) {
        context.json({ message: "Invalid credentials" });
      }

      const token = createToken(user!);

      context.json({
        message: "User created successfully",
        token: token,
        user: user,
      });
    } catch (e) {
      context.json({ message: e.message });
    }
  },
});
