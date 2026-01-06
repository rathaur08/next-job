"use client";

import { Controller, useForm } from "react-hook-form";
import {
  BuildingOffice2Icon,
  GlobeAltIcon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { updateEmployerProfileAction } from "@/features/server/EmployersAction";
import { toast } from "react-toastify";
import { employerProfileSchema, organizationTypes, teamSizes } from "../EmployerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import RichTextEditor from "@/components/RichTextEditor";
import { UploadButton } from "@uploadthing/react";

export default function EmployerProfileForm({ initialData }) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      organizationType: initialData?.organizationType || undefined,
      teamSize: initialData?.teamSize || undefined,
      yearOfEstablishment: initialData?.yearOfEstablishment,
      websiteUrl: initialData?.websiteUrl || "",
      location: initialData?.location || "",
      avatarUrl: initialData?.avatarUrl || "",
      // bannerImageUrl: initialData?.bannerImageUrl || "",
    },
    resolver: zodResolver(employerProfileSchema),
  });

  const avatarUrl = watch("avatarUrl");
  console.log("avatarUrl--Updated:", avatarUrl);

  const handleRemoveAvatar = () => {
    setValue("avatarUrl", ""); //Programmatically update a form field’s value inside react-hook-form.
  };

  const onSubmit = async (data) => {
    // console.log("Updated Data:", data);

    const response = await updateEmployerProfileAction(data);

    if (response.status === "SUCCESS") {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="max-w-4xl bg-white rounded-xl shadow-sm border p-8">
      <h2 className="text-xl font-semibold mb-6">Employer Setting Page</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div className="grid lg:grid-cols-[1fr_4fr] gap-6">
          {/* LOGO */}
          {/* <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Uploaded files:", res[0].ufsUrl);
              alert("Upload Completed");
            }}
            onUploadError={(error) => {
              alert(`ERROR: ${error.message}`);
            }}
          /> */}

          <div>
            <label>Company Logo</label>
            {avatarUrl ? (
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-border">
                  <img
                    src={avatarUrl}
                    alt="Company logo"
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
                <button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveAvatar}
                >
                  {/* < className="w-4 h-4 mr-2" /> */}
                  Remove Lo1234
                  12go
                </button>
              </div>
            ) : (
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  const profilePic = res[0];

                  setValue("avatarUrl", profilePic.ufsUrl, {
                    shouldDirty: true,
                  });
                  console.log("Files--: ", res);
                }}
                onUploadError={(error) => {
                  toast.error(`Upload failed: ${error.message}`);
                }}
              />
            )}
          </div>
        </div>

        {/* Company Name */}
        <Field label="Company Name *" error={errors.name}>
          <Input
            icon={<BuildingOffice2Icon />}
            placeholder="Company name"
            {...register("name", { required: "Company name is required" })}
          />
        </Field>

        {/* Description */}
        <Field label="Company Description *" error={errors.description}>
          {/* <textarea
            rows={4}
            className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:outline-none"
            placeholder="Write about your company"
            {...register("description", { required: "Description is required" })}
          /> */}
          <RichTextEditor
            name="description"
            control={control}
          // label="Description"
          />
        </Field>

        {/* Grid Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Organization Type *" error={errors.organizationType}>
            <Select {...register("organizationType")}>
              <option value="">Select organization type</option>

              {organizationTypes && organizationTypes.map((type) => (
                <option key={type} value={type}>
                  {(type)}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Team Size *" error={errors.teamSize}>
            <Select {...register("teamSize")}>
              <option>Select Team Sizes</option>
              {teamSizes && teamSizes.map((type) => (
                <option key={type} value={type}>
                  {(type)}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Year of Establishment *" error={errors.yearOfEstablishment}>
            <Input
              icon={<CalendarIcon />}
              placeholder="YYYY"
              {...register("yearOfEstablishment")}
            />
          </Field>

          <Field label="Location *" error={errors.location}>
            <Input
              icon={<MapPinIcon />}
              placeholder="City"
              {...register("location")}
            />
          </Field>
        </div>

        {/* Website */}
        <Field label="Website URL (Optional)" error={errors.websiteUrl}>
          <Input
            icon={<GlobeAltIcon />}
            placeholder="https://example.com"
            {...register("websiteUrl")}
          />
        </Field>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={!isDirty}
            className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Saving Changes..." : "Save Changes"}
          </button>

          {!isDirty && (
            <p className="text-sm text-gray-500">No changes to save</p>
          )}
        </div>
      </form>
    </div>
  );
}

/* -------------------- UI Helpers -------------------- */

function Field({ label, error, children }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}

function Input({ icon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-3 h-5 w-5 text-gray-400">
        {icon}
      </span>
      <input
        className="w-full rounded-lg border pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-black focus:outline-none"
        {...props}
      />
    </div>
  );
}

function Select({ children, ...props }) {
  return (
    <select
      className="w-full rounded-lg border px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-black focus:outline-none"
      {...props}
    >
      {children}
    </select>
  );
}
