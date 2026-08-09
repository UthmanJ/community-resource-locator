import { Link } from 'react-router-dom';

const categoryColors = {
  Clinic: 'bg-red-500/20 text-red-400',
  Hospital: 'bg-red-500/20 text-red-400',
  'ICT Center': 'bg-blue-500/20 text-blue-400',
  Library: 'bg-purple-500/20 text-purple-400',
  NGO: 'bg-emerald-500/20 text-emerald-400',
  School: 'bg-amber-500/20 text-amber-400',
  'Community Center': 'bg-teal-500/20 text-teal-400',
  Pharmacy: 'bg-pink-500/20 text-pink-400',
  Other: 'bg-slate-500/20 text-slate-400',
};

function ResourceListItem({ resource }) {
  return (
    <Link
      to={`/resource/${resource._id}`}
      className="block bg-slate-800 border border-slate-700 hover:border-emerald-500/50 rounded-lg p-4 transition-colors"
    >
      <div className="flex items-start justify-between gap-3 mb-1">
        <h3 className="text-slate-100 font-medium">{resource.name}</h3>
        <span
          className={`shrink-0 text-xs px-2 py-0.5 rounded-full ${categoryColors[resource.category] || categoryColors.Other}`}
        >
          {resource.category}
        </span>
      </div>
      <p className="text-slate-400 text-sm line-clamp-2">{resource.description}</p>
      <p className="text-slate-500 text-xs mt-2">{resource.address}</p>
    </Link>
  );
}

export default ResourceListItem;