import ApplicantSidebar from "@/features/applicants/components/ApplicantSidebar";
import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const user = await getCurrentUser();
  // console.log("Current User:", user);

  if (!user) return redirect("/login");
  if (user.role !== "applicant") return redirect("/employer-dashboard");

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        <ApplicantSidebar />
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </>
  );
}