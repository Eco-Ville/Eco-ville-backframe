import { createHandler, z } from "@backframe/rest";
import { prisma } from "../../db.js";
import { protect } from "../../auth.js";
export const GET = createHandler({
    async action(context){
        try{
            const posts = await prisma.post.findMany();

            context.json({posts})

        }catch(e){
            context.json({message: e.message})
        }
    },
    middleware: [
        protect
    ]

})

export const POST = createHandler({
    input: z.object({
        name: z.string(),
        location: z.string(),
        lon: z.number(),
        lat: z.number(),
        image: z.string(),
        description: z.string(),
        belongsToId: z.string(),
        type: z.enum(["GLASS", "ORGANIC", "PLASTIC", "METAL", "ELECTRONIC"])
    }),

    async action(context){
        const {name, location, lon, lat, image, description,belongsToId} = context.input;
        try{
            const post = await prisma.post.create({
                data:{
                    name: name,
                    location: location,
                    lon: lon,
                    lat: lat,
                    image: image,
                    description: description,
                    belongsToId: belongsToId
                }
            })

            context.json({message: "Post created successfully", post: post})

        }catch(e){
            context.json({message: e.message})
        }
    },
    middleware: [protect]
})