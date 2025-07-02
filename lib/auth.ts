import { getServerSession } from "next-auth";
import { authOptions } from "./auth-config";
import { redirect } from "next/navigation";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function requireCoach() {
  const user = await requireAuth();
  if (user.role !== "COACH") {
    redirect("/dashboard");
  }
  return user;
}

export async function requireCustomer() {
  const user = await requireAuth();
  if (user.role !== "CUSTOMER") {
    redirect("/coach");
  }
  return user;
} 