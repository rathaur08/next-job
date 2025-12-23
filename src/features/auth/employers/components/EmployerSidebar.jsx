import {
  BriefcaseIcon,
  UsersIcon,
  PlusIcon,
  BookmarkIcon,
  CreditCardIcon,
  BuildingOffice2Icon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { logoutUserAction } from "../../server/auth.actions";
import Link from "next/link";

const EmployerSidebar = () => {
  return (
    <aside className="w-64 bg-white border-r px-6 py-6 hidden md:flex flex-col">
      <h2 className="text-sm font-semibold text-gray-400 mb-6">
        EMPLOYERS DASHBOARD
      </h2>

      <nav className="space-y-2">
        <Link href="/employer-dashboard">
          <SidebarItem
            icon={<BriefcaseIcon className="w-5 h-5" />}
            label="Overview"
            active
          />
        </Link>

        <SidebarItem
          icon={<UsersIcon className="w-5 h-5" />}
          label="Employers Profile"
        />

        <SidebarItem
          icon={<PlusIcon className="w-5 h-5" />}
          label="Post a Job"
        />

        <SidebarItem
          icon={<BriefcaseIcon className="w-5 h-5" />}
          label="My Jobs"
        />

        <SidebarItem
          icon={<BookmarkIcon className="w-5 h-5" />}
          label="Saved Candidate"
        />

        <SidebarItem
          icon={<CreditCardIcon className="w-5 h-5" />}
          label="Plans & Billing"
        />

        <SidebarItem
          icon={<BuildingOffice2Icon className="w-5 h-5" />}
          label="All Companies"
        />

        <Link href="/settings">
          <SidebarItem
            icon={<Cog6ToothIcon className="w-5 h-5" />}
            label="Settings"
          />
        </Link>
      </nav>

      {/* Logout Button */}
      {/* <form action={logoutUserAction} className="mt-auto pt-10"> */}
      <button type="submit" className="w-full mt-auto pt-10" onClick={logoutUserAction}>
        <SidebarItem
          icon={<ArrowLeftOnRectangleIcon className="w-5 h-5" />}
          label="Log-out"
        />
      </button>
      {/* </form> */}
    </aside>
  );
};

export default EmployerSidebar;



/* ------------------ Components ------------------ */

function SidebarItem({ icon, label, active = false }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition
        ${active
          ? "bg-blue-100 text-blue-600"
          : "text-gray-600 hover:bg-gray-100"
        }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}