import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getResourceById, deleteResource } from '../services/api';

function ResourceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getResourceById(id)
      .then(setResource)
      .catch(() => setError('Resource not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return;
    try {
      setDeleting(true);
      await deleteResource(id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete resource.');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-slate-400">Loading...</p>
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-4">
        <p className="text-red-400">{error || 'Resource not found'}</p>
        <Link to="/" className="text-emerald-400 hover:underline">
          ← Back to map
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-8 md:px-12">
      <Link
        to="/"
        className="text-slate-400 hover:text-emerald-400 text-sm mb-6 inline-block transition-colors"
      >
        ← Back to map
      </Link>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 md:p-8 max-w-2xl">
        <div className="flex items-start justify-between mb-4 gap-3">
          <h1 className="text-2xl font-bold text-slate-100">{resource.name}</h1>
          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full shrink-0">
            {resource.category}
          </span>
        </div>

        <p className="text-slate-300 mb-6">{resource.description}</p>

        <div className="space-y-3 text-sm mb-6">
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Address</p>
            <p className="text-slate-200">{resource.address}</p>
          </div>

          {resource.contactPhone && (
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Phone</p>
              <p className="text-slate-200">{resource.contactPhone}</p>
            </div>
          )}

          {resource.contactEmail && (
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Email</p>
              <p className="text-slate-200">{resource.contactEmail}</p>
            </div>
          )}

          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Submitted by</p>
            <p className="text-slate-200">{resource.submittedBy}</p>
          </div>
        </div>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-sm text-red-400 hover:text-red-300 border border-red-500/40 hover:border-red-500/60 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {deleting ? 'Deleting...' : 'Delete Resource'}
        </button>
      </div>
    </div>
  );
}

export default ResourceDetail;