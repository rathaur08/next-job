"use client";

import { useForm } from "react-hook-form";
import {
  JOB_TYPE,
  WORK_TYPE,
  JOB_LEVEL,
  SALARY_CURRENCY,
  SALARY_PERIOD,
  MIN_EDUCATION,
} from "@/config/constant";
import { createJobAction } from "@/features/server/JobsAction";
import { toast } from "react-toastify";
import { jobsSchema } from "../jobs/JobsSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const EmployerJobsForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: zodResolver(jobsSchema),
  });

  const onSubmit = async (data) => {
    console.log("JOB DATA:", data);

    const response = await createJobAction(data);

    if (response.status === "SUCCESS") {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl bg-white border rounded-xl p-6 space-y-6"
      >
        <h2 className="text-lg font-semibold">Post a New Job</h2>

        {/* Job Title */}
        <Input
          label="Job Title"
          required
          placeholder="e.g., Senior Frontend Developer"
          register={register("title", { required: true })}
        />

        {/* Job Type */}
        <div className="grid md:grid-cols-3 gap-4">
          <Select label="Job Type" register={register("jobType")} options={JOB_TYPE} />
          <Select label="Work Type" register={register("workType")} options={WORK_TYPE} />
          <Select label="Job Level" register={register("jobLevel")} options={JOB_LEVEL} />
        </div>

        {/* Location & Tags */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Location (Optional)"
            placeholder="e.g., New York, Remote"
            register={register("location")}
          />
          <Input
            label="Tags (Optional)"
            placeholder="e.g., React, Node, TypeScript"
            register={register("tags")}
          />
        </div>

        {/* Salary */}
        <div className="grid md:grid-cols-4 gap-4">
          <Input
            label="Min Salary"
            type="number"
            placeholder="e.g., 50000"
            register={register("minSalary")}
          />
          <Input
            label="Max Salary"
            type="number"
            placeholder="e.g., 80000"
            register={register("maxSalary")}
          />
          {errors.maxSalary && (
            <p className="text-sm text-destructive">
              {errors.maxSalary.message}
            </p>
          )}
          <Select
            label="Currency"
            register={register("salaryCurrency")}
            options={SALARY_CURRENCY}
          />
          <Select
            label="Period"
            register={register("salaryPeriod")}
            options={SALARY_PERIOD}
          />
        </div>

        {/* Education & Expiry */}
        <div className="grid md:grid-cols-2 gap-4">
          <Select
            label="Minimum Education"
            register={register("minEducation")}
            options={MIN_EDUCATION}
          />
          <Input
            label="Expiry Date"
            type="date"
            register={register("expiresAt")}
          />
        </div>

        {/* Experience */}
        <Input
          label="Experience Requirements"
          placeholder="e.g., 3+ years of React"
          register={register("experience")}
        />

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Job Description *
          </label>
          <textarea
            rows={6}
            {...register("description", { required: true })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        {/* Actions */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={!isDirty}
            className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Saving Changes..." : " Post Job "}
          </button>

          {!isDirty && (
            <p className="text-sm text-gray-500">No changes to save</p>
          )}
        </div>
        {/* <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-black text-white px-5 py-2 rounded-md text-sm"
          >
            Post Job
          </button>
          <span className="text-sm text-gray-400">No changes to save</span>
        </div> */}
      </form>
    </div>
  );
};

export default EmployerJobsForm;

function Input({ label, register, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} {required && "*"}
      </label>
      <input
        {...register}
        {...props}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}

function Select({ label, register, options }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        {...register}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

