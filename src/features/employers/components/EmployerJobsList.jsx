"use client";
import React, { useState, useEffect } from 'react';
import EmployerJobsCard from './EmployerJobCard';
import { deleteJobAction, getEmployerJobsAction } from '@/features/server/JobsAction';
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const EmployerJobsList = () => {

  const [jobs, setJobs] = useState([]);
  console.log(jobs)
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      try {
        const res = await getEmployerJobsAction();

        if (res.status === "SUCCESS" && res.data) {
          setJobs(res.data);
        } else {
          toast.error(res.message || "Failed to load jobs");
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      const res = await deleteJobAction(jobId);
      if (res.status === "SUCCESS") {
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
        toast.success("Job deleted successfully");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  const handleEdit = async (jobId) => {
    router.push(`/employer-dashboard/jobs/${jobId}/edit`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No jobs posted yet</p>
      </div>
    );
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {jobs.map((job) => (
          <EmployerJobsCard
            key={job.id}
            job={job}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </>
  )
}

export default React.memo(EmployerJobsList)