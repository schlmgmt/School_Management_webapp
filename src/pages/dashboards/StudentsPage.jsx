import { useEffect, useState } from 'react';
import { Trash2, Edit2, Search, Mail, Phone, Book } from 'lucide-react';
import { API_BASE_URL, API_ENDPOINTS } from '../../config/api';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.STUDENTS}/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }

      const data = await response.json();
      setStudents(Array.isArray(data) ? data : data.results || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
      return;
    }

    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.STUDENTS}/${studentId}/`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete student');
      }

      setStudents(students.filter((s) => s.id !== studentId));
      alert('Student deleted successfully!');
    } catch (err) {
      console.error('Error deleting student:', err);
      alert('Error deleting student: ' + err.message);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.phone?.includes(searchTerm) ||
    student.school_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roll_number?.includes(searchTerm)
  );

  return (
    <div className="flex-1 pl-64 max-sm:pl-0 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow">
        <div className="px-6 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            All Students
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Total: {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}
          </p>
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
              placeholder="Search students by name, email, phone, school, class, or roll number..."
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
          /* Students List */
          <div className="grid gap-4 sm:gap-6">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                        {student.name || 'N/A'}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        School: {student.school_name || 'N/A'} • Class: {student.class_name || 'N/A'}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>{student.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{student.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Book className="w-4 h-4" />
                      <span>{student.roll_number || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400">
                  {students.length === 0 ? 'No students found.' : 'No students match your search.'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsPage;
