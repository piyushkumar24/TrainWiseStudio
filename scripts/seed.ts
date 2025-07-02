import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Starting database seed...");

    // Create coach user
    const coachPassword = await hash("Password@123", 10);
    const coach = await prisma.user.upsert({
      where: { email: "admin@admin.com" },
      update: {},
      create: {
        email: "admin@admin.com",
        name: "Admin Coach",
        password: coachPassword,
        role: "COACH",
      },
    });
    console.log(`Created coach: ${coach.name} (${coach.email})`);

    // Create some example program templates
    const fitnessProgram = await prisma.program.create({
      data: {
        title: "Beginner Strength Training",
        description: "A comprehensive program for beginners to build strength and muscle.",
        type: "FITNESS",
        status: "SAVED",
        createdById: coach.id,
        content: {
          blocks: [
            {
              type: "text",
              content: "Welcome to your strength training program!",
            },
            {
              type: "workout",
              title: "Day 1: Upper Body",
              exercises: [
                { name: "Push-ups", sets: 3, reps: "10-12" },
                { name: "Dumbbell Rows", sets: 3, reps: "10-12" },
                { name: "Shoulder Press", sets: 3, reps: "10-12" },
              ],
            },
            {
              type: "workout",
              title: "Day 2: Lower Body",
              exercises: [
                { name: "Squats", sets: 3, reps: "10-12" },
                { name: "Lunges", sets: 3, reps: "10-12 each leg" },
                { name: "Calf Raises", sets: 3, reps: "15-20" },
              ],
            },
          ],
        },
        duration: 28, // 4 weeks
      },
    });
    console.log(`Created fitness program: ${fitnessProgram.title}`);

    const nutritionProgram = await prisma.program.create({
      data: {
        title: "Clean Eating Basics",
        description: "Learn the fundamentals of clean eating with simple recipes.",
        type: "NUTRITION",
        status: "SAVED",
        createdById: coach.id,
        content: {
          blocks: [
            {
              type: "text",
              content: "Welcome to your clean eating program!",
            },
            {
              type: "recipe",
              title: "Breakfast: Protein Oatmeal",
              ingredients: [
                "1/2 cup rolled oats",
                "1 scoop protein powder",
                "1 tbsp almond butter",
                "1/2 banana, sliced",
                "Cinnamon to taste",
              ],
              instructions: "Mix oats with water, microwave for 2 minutes. Stir in protein powder and top with banana and almond butter.",
              macros: { protein: 25, carbs: 35, fat: 12 },
            },
            {
              type: "recipe",
              title: "Lunch: Chicken Salad",
              ingredients: [
                "4 oz grilled chicken breast",
                "2 cups mixed greens",
                "1/4 cup cherry tomatoes",
                "1/4 avocado, sliced",
                "1 tbsp olive oil and vinegar dressing",
              ],
              instructions: "Combine all ingredients in a bowl and toss with dressing.",
              macros: { protein: 30, carbs: 10, fat: 15 },
            },
          ],
        },
        duration: 21, // 3 weeks
      },
    });
    console.log(`Created nutrition program: ${nutritionProgram.title}`);

    const mentalProgram = await prisma.program.create({
      data: {
        title: "Stress Management",
        description: "Techniques to reduce stress and improve mental wellbeing.",
        type: "MENTAL",
        status: "SAVED",
        createdById: coach.id,
        content: {
          blocks: [
            {
              type: "text",
              content: "Welcome to your stress management program!",
            },
            {
              type: "exercise",
              title: "Daily Meditation",
              instructions: "Find a quiet place and sit comfortably. Focus on your breath for 10 minutes.",
              duration: "10 minutes",
            },
            {
              type: "exercise",
              title: "Gratitude Journal",
              instructions: "Write down three things you're grateful for each day.",
              duration: "5 minutes",
            },
          ],
        },
        duration: 14, // 2 weeks
      },
    });
    console.log(`Created mental program: ${mentalProgram.title}`);

    // Create a blog post
    const blogPost = await prisma.blogPost.create({
      data: {
        title: "The Importance of Recovery",
        content: {
          blocks: [
            {
              type: "heading",
              content: "Why Recovery Is Just As Important As Exercise",
            },
            {
              type: "text",
              content: "Many fitness enthusiasts focus solely on their workouts, but recovery plays an equally crucial role in achieving your fitness goals.",
            },
            {
              type: "text",
              content: "Recovery allows your muscles to repair and grow stronger after the stress of exercise. Without adequate recovery, you risk overtraining, injury, and diminished results.",
            },
          ],
        },
        category: "FITNESS",
        authorId: coach.id,
        published: true,
      },
    });
    console.log(`Created blog post: ${blogPost.title}`);

    // Create a motivational card
    const motivationalCard = await prisma.file.create({
      data: {
        name: "Daily Motivation",
        url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
        type: "MOTIVATIONAL",
        uploaderId: coach.id,
      },
    });
    console.log(`Created motivational card: ${motivationalCard.name}`);

    console.log("Database seed completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 