"use server";

import { db } from "@/config/db";
import { getCurrentUser } from "../auth/server/auth.queries";
import { employers, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { employerProfileSchema } from "../employers/EmployerSchema";


export const updateEmployerProfileAction = async (data) => {
  //
  try {
    const currentUser = await getCurrentUser();

    // if (!currentUser) return redirect("/login");
    if (!currentUser || currentUser.role !== "employer") {
      return { status: "ERROR", message: "Unauthorized access." };
    }

    const { data: validatedData, error } = employerProfileSchema.safeParse(data);
    if (error) return { status: "ERROR", message: error.issues[0].message };

    // console.log(formData.get("name"));
    const { name, description, organizationType, teamSize, yearOfEstablishment, websiteUrl, location, avatarUrl } = validatedData;

    const updateEmployer = await db
      .update(employers)
      .set({
        name,
        description,
        organizationType,
        teamSize,
        yearOfEstablishment: yearOfEstablishment
          ? parseInt(yearOfEstablishment)
          : null,
        websiteUrl,
        location,
      })
      .where(eq(employers.id, currentUser.id));

    // console.log("Update profile data:", updateEmployer);

    await db
      .update(users)
      .set({ avatarUrl })
      .where(eq(users.id, currentUser.id));

    return { status: "SUCCESS", message: "Profile Update Successfully" };

    // console.log("currentEmployer: ", employer);
  } catch (error) {
    return {
      status: "ERROR",
      message: "Something went wrong, please try again",
    };
  }
}