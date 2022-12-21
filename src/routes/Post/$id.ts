import { InternalException, createHandler,z } from "@backframe/rest";
import { prisma } from "../../db.js";
import { protect } from "../../auth.js";

export const GET = createHandler({
  async action(context) {
    try {
      const id = context.params.id;
      const post = await prisma.post.findMany({
        where: {
          id: id,
        },
      });
      context.json({
        message: "Post fetched",
        post: post,
      });
    } catch (e) {
      context.json(InternalException(e.message));
    }
  },
  middleware:[
    protect
  ]
});


export const PUT = createHandler({
    input: z.object({
        name: z.string(),
        location: z.string(),
        lon: z.number(),
        lat: z.number(),
        image: z.string(),
        description: z.string(),
        type: z.enum(["GLASS", "ORGANIC", "PLASTIC", "METAL", "ELECTRONIC"]),
      }),
    
    async action(context){
        const {name,location,lon,lat,image,description,type} = context.input;
        try{
            const id = context.params.id;
            const post = await prisma.post.update({
                data:{
                    name:name,
                    location:location,
                    lon:lon,
                    lat:lat,
                    image: image,
                    description:description,
                    type:type
                },
                where:{
                    id:id
                }
            })

            context.json({
                message: "Post updated",
                post: post,
            })
        }catch(e){
            context.json(InternalException(e.message));
        }
    },
    middleware: [
        protect
    ]
    
})

export const DELETE = createHandler({
    async action(context){
        try{
            const id = context.params.id
            const post = await prisma.post.delete({
                where:{
                    id: id
                }
            });
            context.json({
                message: "Post deleted",
            })

        }catch(e){
            context.json(InternalException(e.message))
        }
    },
    middleware:[
        protect
    ]
})