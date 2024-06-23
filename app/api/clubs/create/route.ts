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
            name,
            desc
        } = body

        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse(('Unauthorized'), { status: 401 });
        }

        if (!name || !desc) {
            return new NextResponse(('Name or description missing'), { status: 400 });
        }

        const newClub = await prisma.club.create({
            data: {
                name,
                leaderId: currentUser.id,
                desc,
                users: {
                    connect: [
                        {
                            id: currentUser.id
                        }
                    ]
                },
            },
            include: {
                users: true
            }
        })

        return NextResponse.json(newClub);

    } catch(error: any) {
        return new NextResponse(('Internal Error'), { status: 500 });
    }
}