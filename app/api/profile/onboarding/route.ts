import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { goals, allergies, pastInjuries, likesAndDislikes, preferredProgram } = await req.json();

    // Update user profile
    await prisma.profile.update({
      where: {
        userId: session.user.id,
      },
      data: {
        goals,
        allergies,
        pastInjuries,
        likesAndDislikes,
        preferredProgram,
        onboardingComplete: true,
      },
    });

    // Send welcome file
    // This would be implemented with actual file generation and notification
    // For now, we'll just log it
    console.log(`Welcome file should be sent to user ${session.user.id}`);

    return NextResponse.json(
      { message: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { message: "An error occurred during onboarding" },
      { status: 500 }
    );
  }
} 