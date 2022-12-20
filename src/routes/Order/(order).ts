import { InternalException, createHandler,z } from "@backframe/rest";
import { prisma } from "../../db.js";

export const POST = createHandler({
    input: z.object({
        name: z.string(),
        location: z.string(),
        lon: z.number(),
        lat: z.number(),
        image: z.string(),
        description: z.string(),
        amount: z.number(),
        belongsToId: z.string(),
        type: z.enum(["GLASS", "ORGANIC", "PLASTIC", "METAL", "ELECTRONIC"])
    }),
    async action(context){
        const {name, location, lon, lat, image, description, amount, belongsToId} = context.input;
        try{
            const post = await prisma.order.create({
                data:{
                    name: name,
                    location: location,
                    lon: lon,
                    lat: lat,
                    image: image,
                    description: description,
                    amount_bid: amount,
                    belongsToId: belongsToId
                }
            })

            context.json({message: "Order created successfully", post: post})

        }catch(e){
            context.json({message: e.message})
        }
    }
})

export const GET = createHandler({
   async action(context){
    try{
        const order = await prisma.order.findMany({
            where:{
                belongsToId: context.user
            }
        })

        context.json({message: "Order fetched", order: order})

    }catch(e){
        context.json(InternalException(e.message))
    }
    }
})