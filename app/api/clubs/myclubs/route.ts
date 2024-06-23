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

        const clubs = await prisma.club.findMany({
            where: {
                userIds: {
                    has : currentUser.id
                }
            }
        })

        return NextResponse.json(clubs);

    } catch(error: any) {
        return new NextResponse(('Internal Error'), { status: 500 });
    }
}