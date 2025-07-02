import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password, planType } = await req.json();

    // Validate input
    if (!name || !email || !password || !planType) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "CUSTOMER",
      },
    });

    // Create empty profile
    await prisma.profile.create({
      data: {
        userId: user.id,
      },
    });

    // Create subscription based on plan type
    const now = new Date();
    let endDate = new Date();

    switch (planType) {
      case "TRIAL":
        // 14 days trial
        endDate.setDate(now.getDate() + 14);
        break;
      case "OTP":
        // 30 days from program assignment (will be updated when program is assigned)
        endDate.setDate(now.getDate() + 30);
        break;
      case "STANDARD":
      case "PREMIUM":
        // 30 days subscription
        endDate.setDate(now.getDate() + 30);
        break;
      default:
        endDate.setDate(now.getDate() + 14); // Default to trial
    }

    await prisma.subscription.create({
      data: {
        userId: user.id,
        planType: planType as any, // Cast to PlanType enum
        startDate: now,
        endDate,
      },
    });

    // Create request for coach
    await prisma.request.create({
      data: {
        userId: user.id,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
} 