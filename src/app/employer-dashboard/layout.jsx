import { getCurrentUser } from "@/features/auth/server/auth.queries";
import EmployerSidebar from "@/features/employers/components/EmployerSidebar";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const user = await getCurrentUser();
  // console.log("Current User:", user);

  if (!user) return redirect("/login");
  if (user.role !== "employer") return redirect("/dashboard");

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        <EmployerSidebar />
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </>
  );
}