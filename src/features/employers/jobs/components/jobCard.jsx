import Link from "next/link";
import { formatDistanceToNow } from "date-fns"; // npm i date-fns
import { Briefcase, MapPin } from "lucide-react";

const JobCard = ({ job }) => {

  // Helper to format salary safely
  const formatSalary = () => {
    if (!job.minSalary || !job.maxSalary) return "Not Disclosed";
    return `${job.salaryCurrency} ${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()}`;
  };

  return (
    <>
      <Link href={`/dashboard/jobs/${job.id}`} className="block">
        <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <div className="flex gap-3">
            <img
              src={job.companyLogo}
              alt="logo"
              className="w-12 h-12 rounded-md object-cover"
            />

            <div>
              <h3 className="font-semibold text-sm md:text-base">
                {job.title}
              </h3>
              <p className="text-gray-500 text-xs">
                {job.companyName}
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {job.location}
            </span>

            <span className="flex items-center gap-1">
              <Briefcase size={14} /> {job.jobType}
            </span>

            <span>{job.salary}</span>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4 text-xs">
            <span className="text-gray-400">
              Posted about
              {formatDistanceToNow(new Date(job.createdAt), {
                addSuffix: true,
              })}
            </span>

            <button className="text-blue-600 hover:underline font-medium">
              View Details →
            </button>
          </div>
        </div>
      </Link>
    </>
  )
}

export default JobCard