"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { logoutUserAction } from "@/features/auth/server/auth.actions";

/* ---------------- MENU CONFIG ---------------- */

const menuItems = [
  {
    name: "Overview",
    href: "/employer-dashboard",
    icon: BriefcaseIcon,
  },
  {
    name: "Employers Profile",
    href: "#",
    icon: UsersIcon,
  },
  {
    name: "Post a Job",
    href: "#",
    icon: PlusIcon,
  },
  {
    name: "My Jobs",
    href: "#",
    icon: BuildingOffice2Icon,
  },
  {
    name: "Saved Candidate",
    href: "#",
    icon: BookmarkIcon,
  },
  {
    name: "Plans & Billing",
    href: "#",
    icon: CreditCardIcon,
  },
  {
    name: "Settings",
    href: "/employer-dashboard/settings",
    icon: Cog6ToothIcon,
  },
];

/* ---------------- ACTIVE LINK LOGIC (JSX SAFE) ---------------- */

function isLinkActive({ href, pathname, base = "/" }) {
  const normalizedHref = href.replace(/\/$/, "") || "/";

  return normalizedHref === base
    ? pathname === base || pathname === base + "/"
    : pathname.startsWith(normalizedHref);
}

/* ---------------- SIDEBAR ---------------- */

const EmployerSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r px-6 py-6 hidden md:flex flex-col">
      <h2 className="text-sm font-semibold text-gray-400 mb-6">
        EMPLOYERS DASHBOARD
      </h2>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isLinkActive({
            href: item.href,
            pathname,
            base: "/employer-dashboard",
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
      <button
        onClick={logoutUserAction}
        className="mt-auto pt-8 flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
      >
        <ArrowLeftOnRectangleIcon className="w-5 h-5" />
        Log-out
      </button>
    </aside>
  );
};

export default EmployerSidebar;