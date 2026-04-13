import JobCard from "@/features/employers/jobs/components/jobCard";
import { getAllJobs } from "@/features/employers/jobs/server/JobsQueries";
import { Briefcase, MapPin, Search } from "lucide-react";

const page = async () => {
  // Fetch Data  jobs
  const jobs = await getAllJobs();

  console.log("jobs", jobs);

  return (
    <>
      <div className="min-h-screen p-4 md:p-8">
        {/* Header */}
        <div className="max-w-6xl">
          <h1 className="text-xl md:text-2xl font-semibold">
            Find your Next Dream Job
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Browse latest job openings from top companies.
          </p>

          {/* Search Box */}
          <div className="mt-4 bg-white border rounded-xl p-4 shadow-sm mb-6">
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, skill, or company..."
                className="w-full outline-none text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mt-3">
              <select className="filter-select">
                <option>Job Type</option>
                <option>Remote</option>
                <option>On-site</option>
                <option>Hybrid</option>
              </select>

              <select className="filter-select">
                <option>Job Level</option>
                <option>Junior</option>
                <option>Mid</option>
                <option>Senior</option>
              </select>

              <select className="filter-select">
                <option>Work Type</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
              </select>
            </div>
          </div>

          {/* Job Cards */}
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="flex h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-center">
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                No jobs found
              </h3>
              <p className="text-gray-500">
                Check back later for new opportunities.
              </p>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default page;