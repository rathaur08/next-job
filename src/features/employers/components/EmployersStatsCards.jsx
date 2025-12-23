import {
  BriefcaseIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const EmployersStatsCards = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <StatCard
          title="Open Jobs"
          value="589"
          bg="bg-blue-50"
          iconBg="bg-blue-100"
          icon={<BriefcaseIcon className="w-6 h-6 text-blue-600" />}
        />

        <StatCard
          title="Saved Candidates"
          value="2,517"
          bg="bg-orange-50"
          iconBg="bg-orange-100"
          icon={<UsersIcon className="w-6 h-6 text-orange-600" />}
        />
      </div>
    </>
  )
}

export default EmployersStatsCards


/* ------------------ Components ------------------ */

function StatCard({ title, value, icon, bg, iconBg }) {
  return (
    <div className={`p-6 rounded-xl ${bg} flex justify-between items-center`}>
      <div>
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-gray-500 text-sm mt-1">{title}</p>
      </div>

      <div className={`p-3 rounded-lg ${iconBg}`}>{icon}</div>
    </div>
  );
}
