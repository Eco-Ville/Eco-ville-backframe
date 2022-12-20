import { createHandler, z, InternalException } from "@backframe/rest";
import { prisma } from "../../db.js";
const POST = createHandler({
  input: z.object({
    bio: z.string(),
    location: z.string(),
    phone: z.string(),
    lon: z.number(),
    lat: z.number(),
    image: z.string()
  }),
  async action(context) {
    const { bio, location, phone, lon, lat, image } = context.input;
    try {
      const profile = await prisma.profile.create({
        data: {
          id: context.user,
          bio,
          location,
          contactPhone: phone,
          lon,
          lat,
          image
        }
      });
      context.json({ message: "Profile created successfully", profile });
    } catch (e) {
      context.json(InternalException(e.message));
    }
  }
});
const GET = createHandler({
  async action(context) {
    try {
      const profile = await prisma.profile.findMany({
        where: {
          id: context.user
        }
      });
      context.json({ message: "Profile fetched", profile });
    } catch (e) {
      context.json(InternalException(e.message));
    }
  }
});
export {
  GET,
  POST
};
