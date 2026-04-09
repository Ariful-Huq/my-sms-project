// frontend-web/src/pages/SubjectManagement.jsx
import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await api.get('/academics/subjects/');
      setSubjects(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching subjects", err);
      setLoading(false);
    }
  };

  const toggleField = async (id, field, currentValue) => {
    try {
      await api.patch(`/academics/subjects/${id}/`, {
        [field]: !currentValue
      });
      fetchSubjects();
    } catch (err) {
      alert("Update failed");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Subjects...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Subject & Mark Distribution</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4 border-b">Subject Name</th>
              <th className="p-4 border-b">Code</th>
              <th className="p-4 border-b">Written</th>
              <th className="p-4 border-b">Objective</th>
              <th className="p-4 border-b">Practical</th>
              <th className="p-4 border-b">Total Marks</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map(sub => (
              <tr key={sub.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{sub.name}</td>
                <td className="p-4 text-gray-500">{sub.subject_code}</td>
                
                {/* Written Toggle */}
                <td className="p-4">
                  <button 
                    onClick={() => toggleField(sub.id, 'is_written_applicable', sub.is_written_applicable)}
                    className={`text-xs px-2 py-1 rounded ${sub.is_written_applicable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}
                  >
                    {sub.is_written_applicable ? `${sub.written_max_marks} (On)` : 'Off'}
                  </button>
                </td>

                {/* Objective Toggle */}
                <td className="p-4">
                  <button 
                    onClick={() => toggleField(sub.id, 'is_objective_applicable', sub.is_objective_applicable)}
                    className={`text-xs px-2 py-1 rounded ${sub.is_objective_applicable ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-400'}`}
                  >
                    {sub.is_objective_applicable ? `${sub.objective_max_marks} (On)` : 'Off'}
                  </button>
                </td>

                {/* Practical Toggle */}
                <td className="p-4">
                  <button 
                    onClick={() => toggleField(sub.id, 'is_practical_applicable', sub.is_practical_applicable)}
                    className={`text-xs px-2 py-1 rounded ${sub.is_practical_applicable ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-400'}`}
                  >
                    {sub.is_practical_applicable ? `${sub.practical_max_marks} (On)` : 'Off'}
                  </button>
                </td>

                <td className="p-4 font-bold text-blue-600">{sub.total_marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectManagement;