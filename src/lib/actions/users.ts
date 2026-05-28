"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

export async function syncUser() {
  try {
    const user = await currentUser();
    if (!user) return;

    const dbUser = await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        phone: user.phoneNumbers[0]?.phoneNumber,
      },
      create: {
        clerkId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        phone: user.phoneNumbers[0]?.phoneNumber,
      },
    });

    return dbUser;
  } catch (error: any) {
    if (
      error &&
      typeof error === "object" &&
      (error.digest === "DYNAMIC_SERVER_USAGE" ||
        error.name === "DynamicServerError" ||
        error.message?.toLowerCase().includes("dynamic server usage") ||
        error.message?.toLowerCase().includes("dynamic-server-error"))
    ) {
      throw error;
    }
    console.log("Error in syncUser server action", error);
  }
}