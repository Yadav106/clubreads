import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(
    request: Request,
) {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse(('Unauthorized'), { status: 401 });
        }

        const clubs = await prisma.club.findMany()

        if (!clubs) {
            return new NextResponse(('No club found'), { status: 400 });
        }

        return NextResponse.json(clubs);

    } catch(error: any) {
        return new NextResponse(('Internal Error'), { status: 500 });
    }
}