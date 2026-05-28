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
    if (error && typeof error === "object") {
      const errStr = String(error.message || error.description || error.stack || error);
      if (
        errStr.toLowerCase().includes("dynamic") ||
        errStr.toLowerCase().includes("static") ||
        error.digest === "DYNAMIC_SERVER_USAGE" ||
        error.name === "DynamicServerError"
      ) {
        throw error;
      }
    }
    console.log("Error in syncUser server action", error);
  }
}