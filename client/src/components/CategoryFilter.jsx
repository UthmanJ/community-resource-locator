const CATEGORIES = [
  'All', 'Clinic', 'Hospital', 'ICT Center', 'Library', 'NGO',
  'School', 'Community Center', 'Pharmacy', 'Other',
];

function CategoryFilter({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            selected === cat
              ? 'bg-emerald-500 border-emerald-500 text-slate-900 font-medium'
              : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;