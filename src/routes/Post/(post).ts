import { Context, createHandler, z,InternalException } from "@backframe/rest";
import { prisma } from "../../db.js";
import { protect } from "../../auth.js";export const GET = createHandler({
  async action(context) {
    try {
      const posts = await prisma.post.findMany();

      context.json({ posts });
    } catch (e) {
      context.json({ message: e.message });
    }
  },
  middleware: [protect],
});

export const POST = createHandler({
  input: z.object({
    name: z.string(),
    location: z.string(),
    lon: z.number(),
    lat: z.number(),
    image: z.string(),
    description: z.string(),
    type: z.enum(["GLASS", "ORGANIC", "PLASTIC", "METAL", "ELECTRONIC"]),
  }),

  async action(context) {
    const { name, location, lon, lat, image, description } =
      context.input;
    try {
      const post = await prisma.post.create({
        data: {
          name: name,
          location: location,
          lon: lon,
          lat: lat,
          image: image,
          description: description,
          belongsToId: context.user,
        },
      });

      context.json({ message: "Post created successfully", post: post });
    } catch (e) {
      context.json({ message: e.message });
    }
  },
  middleware: [protect],
});


export const DELETE = createHandler({
    async action(context){
        try{
            const posts = await prisma.post.deleteMany({
                where:{
                    id: context.user,
                },
                
            });

            context.json({
                message: "Possts deleted"
            })

        }catch(e){
            context.json(InternalException(e.message))
        }
    }
})