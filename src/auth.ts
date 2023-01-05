import { InternalException, createHandler } from "@backframe/rest";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export const createToken = (user: User) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
};

export const protect = (context) => {
  try {
    const bearer = context.request.headers.authorization;
    if (!bearer) {
      context.json({ message: "No token provided" });
    }
    const token = bearer.split(" ")[1];
    if (!token) {
      context.json({ message: "No token provided" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET as string) as {
      user: User;
    };
    if (!user) {
      context.json({ message: "Invalid token" });
    } else {
      context.user = user.user;
      return context.next();
    }
  } catch (e) {
    context.json(InternalException(e.message));
  }
};
