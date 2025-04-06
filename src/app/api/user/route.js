import prisma from "../../utils/prismadb/prismadb";
import { NextResponse} from "next/server";
import {hash} from "bcrypt";


export async function GET() {
    try{
        const respons = await prisma.user.findMany({
            include:{
                post:true
            }
        })

        return NextResponse.json(respons);
    }catch(error){
        throw error
    }
}

export async function  POST(req){
    try {
        const {name,email,password,profileImage} = await req.json()
        console.log(name,email,password,profileImage);
        const hashedPassword = await hash(password,12)
        const respons = await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
                profileImage
            }
        })
        console.log(respons)
        return NextResponse.json(respons);
    }catch(error){
        throw error
    }
}