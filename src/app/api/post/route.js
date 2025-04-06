import prisma from "../../utils/prismadb/prismadb"
import {NextResponse} from "next/server";


export async function GET(){
    try{
        const respons = await prisma.post.findMany({})

        return NextResponse.json(respons)
    }catch(error){
        throw error
    }
}

export async function POST(req){
    try{
        const {body,image,userId} = await req.json()
        const respons = await prisma.post.create({
            data: {
                body,
                image: {
                    create: image ? [{ url: image }] : [], // Handle single image or no image
                },
                userId,
            },
        });

            return NextResponse.json(respons)
    }catch(error){
        throw error
    }
}