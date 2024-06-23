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
            author,
            desc,
            pages,
            clubId
        } = body

        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse(('Unauthorized'), { status: 401 });
        }

        if (!name || !desc || !author || !pages || !clubId) {
            return new NextResponse(('Data missing'), { status: 400 });
        }

        const newBook = await prisma.book.create({
            data: {
                name,
                author,
                desc,
                pages,
                clubId
            },
            include: {
                club: true
            }
        })

        const updatedClub = await prisma.club.update({
            where: {id: clubId},
            data: {
                currentBook : newBook.id
            },
            include: {books: true}
        })

        return NextResponse.json(updatedClub);

    } catch(error: any) {
        return new NextResponse(('Internal Error'), { status: 500 });
    }
}