import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getResources } from './services/api';
import ResourceMap from './components/ResourceMap';
import ResourceListItem from './components/ResourceListItem';
import CategoryFilter from './components/CategoryFilter';
import AddResourceForm from './components/AddResourceForm';
import ResourceDetail from './pages/ResourceDetail';

function Home() {
  const [resources, setResources] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadResources = async (cat = category) => {
    try {
      setLoading(true);
      const data = await getResources(cat);
      setResources(data);
      setError(null);
    } catch (err) {
      setError('Failed to load resources. Is the backend server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResources(category);
  }, [category]);

  const handleAddSuccess = () => {
    setShowForm(false);
    loadResources(category);
  };

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-8 md:px-12">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">
            Community Resource Locator
          </h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">
            Find clinics, ICT centers, libraries, and more near you
          </p>
        </div>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold px-5 py-2.5 rounded-lg transition-colors shrink-0"
        >
          {showForm ? 'Close Form' : '+ Add Resource'}
        </button>
      </header>

      {showForm && (
        <div className="mb-8">
          <AddResourceForm onSuccess={handleAddSuccess} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {loading ? (
        <p className="text-slate-400">Loading resources...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ResourceMap resources={resources} />
          </div>

          <div>
            <CategoryFilter selected={category} onChange={setCategory} />
            {resources.length === 0 ? (
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center text-slate-400 text-sm">
                No resources found. Be the first to add one!
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {resources.map((resource) => (
                  <ResourceListItem key={resource._id} resource={resource} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/resource/:id" element={<ResourceDetail />} />
    </Routes>
  );
}

export default App;