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
            bookId
        } = body

        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse(('Unauthorized'), { status: 401 });
        }

        if (!bookId) {
            return new NextResponse(('Data missing'), { status: 400 });
        }

        const book = await prisma.book.findFirst({
            where: {
                id: bookId
            }
        })

        return NextResponse.json(book);

    } catch(error: any) {
        return new NextResponse(('Internal Error'), { status: 500 });
    }
}