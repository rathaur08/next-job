import EmployerProfileCompletionStatus from "@/features/auth/employers/components/EmployerProfileCompletionStatus";
import EmployersStatsCards from "@/features/auth/employers/components/EmployersStatsCards";
import { getCurrentUser } from "@/features/auth/server/auth.queries";

const EmployerDashboard = async () => {
  const user = await getCurrentUser();

  if (!user) return redirect("/login");

  return (
    <>
      <h1 className="text-2xl font-bold">Hello, {user?.name}</h1>
      <p className="text-gray-500 mt-1">
        Here is your daily activities and applications
      </p>

      {/* Cards */}
      <EmployersStatsCards />

      {/* Alert */}
      <EmployerProfileCompletionStatus />
    </>
  );
};

export default EmployerDashboard;