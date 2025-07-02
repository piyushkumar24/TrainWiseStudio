import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth-config";

export async function POST(
  req: Request,
  { params }: { params: { requestId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role !== "COACH") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { requestId } = params;

    // Update the request status to SEEN
    const updatedRequest = await prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        status: "SEEN",
        seenAt: new Date(),
      },
    });

    return NextResponse.json(
      { message: "Request marked as seen", request: updatedRequest },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error marking request as seen:", error);
    return NextResponse.json(
      { message: "An error occurred while marking request as seen" },
      { status: 500 }
    );
  }
} 