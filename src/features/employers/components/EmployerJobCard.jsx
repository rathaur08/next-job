"use client";
import { useState } from "react";
import { Pencil, Trash2, MapPin } from "lucide-react";

/* ------------------ Main Component ------------------ */
export default function EmployerJobsCard({ job, onDelete, onEdit }) {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleDeleteClick = () => {
    setSelectedJob(job);
    setOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedJob) return;
    onDelete?.(selectedJob.id);
    setOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl border p-4 shadow-sm">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{job.title}</h3>

          <div className="flex gap-2">
            <button
              className="text-gray-500 hover:text-black"
              onClick={() => onEdit?.(job.id)}
            >
              <Pencil size={16} />
            </button>

            <button
              onClick={handleDeleteClick}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="flex gap-2 mt-2 flex-wrap">
          {job.workType && <span className="badge">{job.workType}</span>}
          {job.jobType && <span className="badge">{job.jobType}</span>}
          {job.jobLevel && <span className="badge">{job.jobLevel}</span>}
        </div>

        {job.location && (
          <p className="flex items-center gap-1 text-sm text-gray-500 mt-2">
            <MapPin size={14} />
            {job.location}
          </p>
        )}

        {(job.minSalary || job.maxSalary) && (
          <p className="text-sm font-medium mt-2">
            {job.salaryCurrency || "USD"} {job.minSalary ?? "—"} -{" "}
            {job.maxSalary ?? "—"}{" "}
            {job.salaryPeriod && `/ ${job.salaryPeriod}`}
          </p>
        )}
      </div>

      {open && (
        <DeleteModal
          job={selectedJob}
          onClose={() => setOpen(false)}
          onDelete={confirmDelete}
        />
      )}
    </>
  );
}

/* ------------------ Delete Modal ------------------ */
function DeleteModal({ job, onClose, onDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
        <h3 className="text-lg font-semibold">Are you sure?</h3>

        <p className="text-sm text-gray-600 mt-2">
          This action cannot be undone. This will permanently delete the job
          listing for <strong>"{job?.title}"</strong>.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-900"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}