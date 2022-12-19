import { InternalException } from "@backframe/rest";
import jwt from "jsonwebtoken";
const createToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
};
const protect = (context) => {
  try {
    const bearer = context.request.headers.authorization;
    if (!bearer) {
      context.json({ message: "No token provided" });
    }
    const token = bearer.split(" ")[1];
    if (!token) {
      context.json({ message: "No token provided" });
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
      context.json({ message: "Invalid token" });
    } else {
      context.user = user.user;
      context.next();
    }
  } catch (e) {
    context.json(InternalException(e.message));
  }
};
export {
  createToken,
  protect
};
