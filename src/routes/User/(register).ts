import { createHandler, z } from "@backframe/rest";
import {hashSync} from "bcrypt";
import { prisma } from "../../db.js";
import { createToken } from "../../auth.js";


export const POST = createHandler({
    input: z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        password: z.string(),
    }),
        async action(context){
            const {firstName, lastName, email, password} = context.input;

            try{
                const user = await prisma.user.create({
                    data:{
                        firstName: firstName,
                        lastName: lastName,
                        contactEmail: email,
                        password: hashSync(password, 10)
                    }
                });

                const token = createToken(user);

                context.json({message: "User logged successfully",token: token, user: user})

            }catch(e){
                context.json({message: e.message})
            }
        }

    })

