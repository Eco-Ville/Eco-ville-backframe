import { createHandler,InternalException,z } from "@backframe/rest";
import { prisma } from "../../../db.js";
import { protect } from "../../../auth.js";

export const GET = createHandler({
    async action(context){
        try{
            const id = context.params.id;
            const post = await prisma.post.findMany({
                where: {
                    type: id,
                },
            });
            context.json({
                message: "Post fetched",
                post: post,
            });
        }catch(e){
            context.json(InternalException(e.message));
        }
    },
    middleware:[
        protect
    ]
})