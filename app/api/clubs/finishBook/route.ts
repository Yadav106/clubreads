import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(
    request: Request,
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            clubId
        } = body

        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse(('Unauthorized'), { status: 401 });
        }

        if (!clubId) {
            return new NextResponse(('Data missing'), { status: 400 });
        }

        const updatedClub = await prisma.club.update({
            where : {id: clubId},
            data : {
                currentBook: ""
            }
        })

        return NextResponse.json(updatedClub);

    } catch(error: any) {
        return new NextResponse(('Internal Error'), { status: 500 });
    }
}