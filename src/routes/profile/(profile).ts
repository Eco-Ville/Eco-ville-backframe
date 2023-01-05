import { createHandler, z, InternalException } from "@backframe/rest";
import { prisma } from "../../db.js";
import { protect } from "../../auth.js";

export const POST = createHandler({
  input: z.object({
    bio: z.string(),
    location: z.string(),
    phone: z.string(),
    lon: z.number(),
    lat: z.number(),
    image: z.string(),
  }),
  async action(context) {
    const { bio, location, phone, lon, lat, image } = context.input;
    try {
      const profile = await prisma.profile.create({
        data: {
          bio: bio,
          location: location,
          contactPhone: phone,
          lon: lon,
          lat: lat,
          image: image,
        },
        
      });

      context.json({
        message: "Profile created successfully",
        profile: profile,
      });
    } catch (e) {
      context.json({message: e.message});
    }
  },
  middleware: [protect],
});

export const GET = createHandler({
  async action(context) {
    try {
      const profile = await prisma.profile.findMany({
        where: {
          id: context.user,
        },
      });

      context.json({ message: "Profile fetched", profile: profile });
    } catch (e) {
      context.json(InternalException(e.message));
    }
  },
});


export const PUT = createHandler({
    input: z.object({
        bio: z.string(),
        location: z.string(),
        phone: z.string(),
        lon: z.number(),
        lat: z.number(),
        image: z.string(),
    }),
    async action(context){
        try{
            const {bio, location, phone, lon, lat, image} = context.input;
            const profile = await prisma.profile.update({
                where:{
                    id: context.user
                },
                data:{
                    bio: bio,
                    location: location,
                    contactPhone: phone,
                    lon: lon,
                    lat: lat,
                    image: image,
                }
            });
            context.json({
                message: "Profile updated successfully",
                profile: profile,
            })

        }catch(e){
            context.json(e.message);
        }
    },
    middleware:[
        protect
    ]
})

// {
//   "bio":"My name is Emilio Kariuki and i am a flutter developer and the upcoming founder of Ecoville and also i engage myself to build a better world where w can help solve problems with technology",
//   "location":"Nyahururu,Kenya",
//   "phone": "+254796250443",
//   "lon": 23.534223,
//   "lat": 23.12212,
//   "image": "url String for the image"
// }