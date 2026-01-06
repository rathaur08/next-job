import EmployerSettingForm from "@/features/employers/components/EmployerSettingForm"
import { getCurrentEmployerDetails } from "@/features/server/EmployersQueries";

const page = async () => {
  const employer = await getCurrentEmployerDetails();
  console.log("employer", employer);

  if (!employer) return redirect("/login");

  return (
    <>
      <div>
        <EmployerSettingForm
          initialData={
            {
              name: employer.employerDetails.name,
              description: employer.employerDetails.description,
              organizationType: employer.employerDetails.organizationType,
              teamSize: employer.employerDetails.teamSize,
              location: employer.employerDetails.location,
              websiteUrl: employer.employerDetails.websiteUrl,
              yearOfEstablishment:
                employer.employerDetails.yearOfEstablishment?.toString(),
              avatarUrl: employer.avatarUrl,
              bannerImageUrl: employer.employerDetails.bannerImageUrl,
            }
          }
        />
      </div>
    </>
  )
}

export default page
