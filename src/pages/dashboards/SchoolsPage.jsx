import { useEffect, useState } from 'react';
import { Plus, Trash2, Eye, Search, ArrowLeft, Save, Power } from 'lucide-react';
import { API_BASE_URL, API_ENDPOINTS } from '../../config/api';

const SchoolDetailsPage = ({ school, onBack, onUpdate }) => {
  const [formData, setFormData] = useState({
    school_name: school?.school_name || '',
    email: school?.email || '',
    phone_number: school?.phone_number || '',
    address: school?.address || '',
    is_active: school?.is_active || false,
  });
  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setIsModified(true);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.SCHOOLS}/${school.school_id}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update school');
      }

      const updatedSchool = await response.json();
      alert('School updated successfully!');
      setIsModified(false);
      onUpdate(updatedSchool);
      onBack();
    } catch (err) {
      console.error('Error updating school:', err);
      alert('Error updating school: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 pl-64 max-sm:pl-0 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              School Details
            </h1>
          </div>
          <button
            onClick={handleUpdate}
            disabled={!isModified || loading}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isModified
                ? 'bg-primary-600 hover:bg-primary-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Save className="w-5 h-5" />
            <span>{loading ? 'Updating...' : 'Update'}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 sm:p-8 border border-gray-200 dark:border-gray-700 max-w-2xl">
          <div className="space-y-6">
            {/* School Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                School Name
              </label>
              <input
                type="text"
                name="school_name"
                value={formData.school_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Active Status Toggle */}
            <div className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  School Status
                </label>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {formData.is_active ? 'Currently Active' : 'Currently Inactive'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SchoolsPage = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewingSchool, setViewingSchool] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    school_name: '',
    email: '',
    phone_number: '',
    address: '',
    is_active: true,
  });

  // Fetch all schools
  const fetchSchools = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.SCHOOLS}/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch schools');
      }

      const data = await response.json();
      setSchools(Array.isArray(data) ? data : data.results || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching schools:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const handleAddSchool = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.SCHOOLS}/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add school');
      }

      const newSchool = await response.json();
      setSchools([...schools, newSchool]);
      setFormData({ school_name: '', email: '', phone_number: '', address: '', is_active: true });
      setShowAddModal(false);
      alert('School added successfully!');
    } catch (err) {
      console.error('Error adding school:', err);
      alert('Error adding school: ' + err.message);
    }
  };

  const handleDeleteSchool = async (schoolId) => {
    if (!window.confirm('Are you sure you want to delete this school?')) {
      return;
    }

    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.SCHOOLS}/${schoolId}/`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete school');
      }

      setSchools(schools.filter((s) => s.school_id !== schoolId));
      alert('School deleted successfully!');
    } catch (err) {
      console.error('Error deleting school:', err);
      alert('Error deleting school: ' + err.message);
    }
  };

  const handleToggleActive = async (school) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const newStatus = !school.is_active;
      
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.SCHOOLS}/${school.school_id}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ is_active: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update school status');
      }

      const updatedSchool = await response.json();
      setSchools(schools.map((s) => (s.school_id === school.school_id ? updatedSchool : s)));
      alert(`School ${updatedSchool.is_active ? 'activated' : 'deactivated'} successfully!`);
    } catch (err) {
      console.error('Error toggling school status:', err);
      alert('Error updating school status: ' + err.message);
    }
  };

  const filteredSchools = schools.filter((school) =>
    school.school_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.phone_number?.includes(searchTerm)
  );

  return (
    <>
      {viewingSchool ? (
        <SchoolDetailsPage
          school={viewingSchool}
          onBack={() => setViewingSchool(null)}
          onUpdate={(updatedSchool) => {
            setSchools(schools.map((s) => (s.school_id === updatedSchool.school_id ? updatedSchool : s)));
            setViewingSchool(updatedSchool);
          }}
        />
      ) : (
        <div className="flex-1 pl-64 max-sm:pl-0 bg-gray-50 dark:bg-gray-900 min-h-screen">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow">
            <div className="px-6 py-4 flex justify-between items-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Manage Schools
              </h1>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Add School</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search schools by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-200">Error: {error}</p>
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="grid gap-4 sm:gap-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 animate-pulse border border-gray-200 dark:border-gray-700"
                  >
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              /* Schools List */
              <div className="grid gap-4 sm:gap-6">
                {filteredSchools.length > 0 ? (
                  filteredSchools.map((school) => (
                    <div
                      key={school.school_id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                            {school.school_name}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            school.is_active
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {school.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          <p>
                            <span className="font-medium">Email:</span> {school.email || 'N/A'}
                          </p>
                          <p>
                            <span className="font-medium">Contact No:</span> {school.phone_number || 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => setViewingSchool(school)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleToggleActive(school)}
                          className={`p-2 rounded-lg transition-colors ${
                            school.is_active
                              ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                              : 'text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                          }`}
                          title={school.is_active ? 'Deactivate School' : 'Activate School'}
                        >
                          <Power className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteSchool(school.school_id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete School"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-400">
                      {schools.length === 0 ? 'No schools found. Add one now!' : 'No schools match your search.'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Add School Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New School</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <form onSubmit={handleAddSchool} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                      School Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.school_name}
                      onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone_number}
                      onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                    >
                      Add School
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SchoolsPage;
