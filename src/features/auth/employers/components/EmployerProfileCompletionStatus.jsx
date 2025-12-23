import { getCurrentEmployerDetails } from "@/features/server/EmployersQueries";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { redirect } from "next/navigation";

const EmployerProfileCompletionStatus = async () => {
  const currentEmployer = await getCurrentEmployerDetails();
  // console.log("current Employer data ", currentEmployer);

  if (!currentEmployer) return redirect("/login");

  if (currentEmployer.isProfileCompleted) return null;

  return (
    <>
      <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-red-400 text-white p-5 rounded-lg">
        <div className="flex gap-3">
          <div className="bg-red-600 p-2 rounded-md">
            <ExclamationTriangleIcon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold">Incomplete Profile</h4>
            <p className="text-sm opacity-90">
              You haven't completed your employer profile yet. Please
              complete your profile to post jobs and access all features.
            </p>
          </div>
        </div>

        <Link href="/setting" className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-md font-medium">
          Complete Profile
        </Link>
      </div>

    </>
  )
}

export default EmployerProfileCompletionStatus
