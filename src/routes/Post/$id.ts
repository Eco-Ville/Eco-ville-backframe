import { InternalException, createHandler } from "@backframe/rest";
import { prisma } from "../../db.js";

const GET = createHandler({
    
    async action(context){
        try{
            const id = String(context.params);
            const post = await prisma.post.findUnique({
                where:{
                    type: id
                }
            });
            context.json(post)

        }catch(e){
            context.json(InternalException(e.message))
        }
    }
})