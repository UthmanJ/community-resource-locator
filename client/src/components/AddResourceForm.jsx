import { useState } from 'react';
import LocationPicker from './LocationPicker';
import { createResource } from '../services/api';

const CATEGORIES = [
  'Clinic', 'Hospital', 'ICT Center', 'Library', 'NGO',
  'School', 'Community Center', 'Pharmacy', 'Other',
];

function AddResourceForm({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Clinic',
    description: '',
    address: '',
    contactPhone: '',
    contactEmail: '',
    submittedBy: '',
  });
  const [position, setPosition] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLocationSelect = (lat, lng) => {
    setPosition([lat, lng]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!position) {
      setError('Please click on the map to set the resource location.');
      return;
    }
    if (!formData.name.trim() || !formData.description.trim() || !formData.address.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setSubmitting(true);
      await createResource({
        ...formData,
        latitude: position[0],
        longitude: position[1],
        submittedBy: formData.submittedBy.trim() || 'Anonymous',
      });
      onSuccess();
    } catch (err) {
      setError('Failed to submit resource. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold text-slate-100">Add a Community Resource</h2>

      <div>
        <label className="block text-sm text-slate-400 mb-1">Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
          placeholder="e.g. Zaria Community Clinic"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">Category *</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
          placeholder="What services does this place offer?"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">Address *</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
          placeholder="Street address or landmark"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Contact Phone</label>
          <input
            type="text"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
            placeholder="Optional"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
            placeholder="Optional"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">Your Name</label>
        <input
          type="text"
          name="submittedBy"
          value={formData.submittedBy}
          onChange={handleChange}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
          placeholder="Optional — defaults to Anonymous"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">
          Location * — click on the map to set the exact location
        </label>
        <LocationPicker position={position} onLocationSelect={handleLocationSelect} />
        {position && (
          <p className="text-xs text-slate-500 mt-1">
            Selected: {position[0].toFixed(5)}, {position[1].toFixed(5)}
          </p>
        )}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-900 font-semibold px-6 py-2.5 rounded-lg transition-colors"
        >
          {submitting ? 'Submitting...' : 'Submit Resource'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-6 py-2.5 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddResourceForm;