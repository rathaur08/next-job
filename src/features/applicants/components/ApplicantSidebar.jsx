"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PlusIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { logoutUserAction } from "@/features/auth/server/auth.actions";
import { Bookmark, Briefcase, LayoutDashboard, LogOut, Settings } from "lucide-react";

/* ---------------- MENU CONFIG ---------------- */

const menuItems = [
  {
    name: "Home",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Find Jobs",
    href: "/dashboard/jobs",
    icon: Briefcase,
  },
  {
    name: "Applied",
    href: "/dashboard/applications/",
    icon: PlusIcon,
  },
  {
    name: "Saved Jobs",
    href: "/dashboard/saved-jobs",
    icon: Bookmark,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

/* ---------------- ACTIVE LINK LOGIC (JSX SAFE) ---------------- */

function isLinkActive({ href, pathname }) {
  const cleanHref = href.replace(/\/$/, "");
  const cleanPath = pathname.replace(/\/$/, "");

  // exact match only
  return cleanPath === cleanHref;
}

/* ---------------- SIDEBAR ---------------- */

const ApplicantSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r px-6 py-6 hidden md:flex flex-col">
      <h2 className="text-sm font-semibold text-gray-400 mb-6">
        APPLICANT DASHBOARD
      </h2>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isLinkActive({
            href: item.href,
            pathname,
          });

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
                ${active
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button onClick={logoutUserAction} className="mt-auto pt-8 flex items-center gap-3 px-3 py-2 text-sm font-medium transition text-gray-600 hover:bg-gray-200 rounded-lg">
        <LogOut className="w-5 h-5" />Log-out
      </button>
    </aside>
  );
};
export default ApplicantSidebar;


