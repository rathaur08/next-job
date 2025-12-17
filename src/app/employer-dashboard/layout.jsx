import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const user = await getCurrentUser();
  //   // console.log("Current User:", user);

  if (!user) return redirect("/login");
  if (user.role !== "employer") return redirect("/dashboard");

  return (
    <>
      {children}
    </>
  );
}