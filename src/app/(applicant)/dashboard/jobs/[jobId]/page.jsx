import { notFound } from "next/navigation";
import { getJobById } from "@/features/employers/jobs/server/JobsQueries";
import Image from "next/image";
// import DOMPurify from "dompurify";


const JobsDetailedPage = async ({ params }) => {
  // 1. Validate & Fetch

  // const { jobId } = await params; // 👈 await params
  // const id = Number(jobId);

  // 2. Correctly await the params Promise first
  const resolvedParams = await params;

  // 3. Convert the string ID to a number
  const jobId = parseInt(resolvedParams.jobId);
  if (isNaN(jobId)) return notFound();

  const job = await getJobById(jobId);
  // console.log("job: ", job);

  if (!job) return notFound();

  return (
    <>
      <div className="max-w-8xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-4">

          <div className="flex items-start gap-4">
            <img src={job.companyLogo} alt={job.companyName} className="w-14 h-14 rounded-lg" />

            <div>
              <h1 className="text-xl font-semibold">{job.title}</h1>
              <p className="text-sm text-gray-500">
                {job.companyName} • {job.location} • Posted{" "}
                {new Date(job.createdAt).toDateString()}
              </p>
            </div>
          </div>

          <button className="bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800">
            Apply Now
          </button>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

          {/* Left */}
          <div className="lg:col-span-2 space-y-6">

            {/* Description */}
            <div>
              <h2 className="font-semibold text-lg mb-2">About the Job</h2>

              <div
                className="prose max-w-none text-gray-600 text-sm"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-semibold text-sm mb-2 uppercase text-gray-700">
                Skills & Technologies
              </h3>

              <div className="flex flex-wrap gap-2">
                {job.tags?.split(",").map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-200 text-sm rounded-full"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">

            {/* Job Overview */}
            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h3 className="font-semibold mb-4">Job Overview</h3>

              <div className="space-y-4 text-sm text-gray-600">

                <div className="flex justify-between">
                  <span>Salary</span>
                  <span className="font-medium text-gray-800">
                    {job.salaryCurrency} {job.minSalary} - {job.maxSalary} / {job.salaryPeriod}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Job Type</span>
                  <span className="font-medium text-gray-800 capitalize">
                    {job.jobType}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Work Type</span>
                  <span className="font-medium text-gray-800 capitalize">
                    {job.workType}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Experience</span>
                  <span className="font-medium text-gray-800">
                    {job.experience} Years
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Level</span>
                  <span className="font-medium text-gray-800 capitalize">
                    {job.jobLevel}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Education</span>
                  <span className="font-medium text-gray-800 capitalize">
                    {job.minEducation}
                  </span>
                </div>

              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h3 className="font-semibold mb-4">About the Company</h3>

              <div
                className="prose max-w-none text-sm text-gray-600"
                dangerouslySetInnerHTML={{ __html: job.companyBio }}
              />

              {job.companyWebsite && (
                <a
                  href={job.companyWebsite}
                  target="_blank"
                  className="text-blue-600 text-sm mt-3 inline-block"
                >
                  Visit Website →
                </a>
              )}
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default JobsDetailedPage;