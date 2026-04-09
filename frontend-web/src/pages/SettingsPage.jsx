// frontend-web/src/pages/SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('periods');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Unified State for all Academic Data
  const [data, setData] = useState({
    periods: [],
    days: [],
    classes: [],
    sections: [],
    years: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [periodRes, dayRes, classRes, sectionRes, yearRes] = await Promise.all([
        api.get('/academics/periods/'),
        api.get('/academics/working-days/'),
        api.get('/academics/classes/'),
        api.get('/academics/sections/'),
        api.get('/academics/years/')
      ]);

      setData({
        periods: periodRes.data,
        days: dayRes.data,
        classes: classRes.data,
        sections: sectionRes.data,
        years: yearRes.data
      });
      setError(null);
    } catch (err) {
      setError("Failed to load settings. Ensure backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleDayStatus = async (day) => {
    try {
      await api.patch(`/academics/working-days/${day.id}/`, {
        is_weekend: !day.is_weekend
      });
      fetchData(); 
    } catch (err) {
      alert("Error updating day status");
    }
  };

  if (loading) return <div className="p-10 text-center font-semibold">Loading School Configuration...</div>;
  if (error) return <div className="p-10 text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-extrabold text-slate-800">Academic Settings</h1>
        <p className="text-slate-500">Configure your school's structural and operational parameters.</p>
      </header>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { id: 'periods', label: 'Class Periods' },
          { id: 'days', label: 'Working Days' },
          { id: 'classes', label: 'Classes' },
          { id: 'sections', label: 'Sections' },
          { id: 'years', label: 'Academic Years' }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-full font-medium transition text-sm ${
              activeTab === tab.id 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[400px]">
        
        {/* PERIODS TAB */}
        {activeTab === 'periods' && (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 uppercase text-xs font-bold">
                <th className="p-4 border-b">Period Name</th>
                <th className="p-4 border-b">Start Time</th>
                <th className="p-4 border-b">End Time</th>
                <th className="p-4 border-b text-center">Type</th>
              </tr>
            </thead>
            <tbody>
              {data.periods.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50 transition">
                  <td className="p-4 border-b font-medium">{p.period_name}</td>
                  <td className="p-4 border-b text-slate-600">{p.start_time}</td>
                  <td className="p-4 border-b text-slate-600">{p.end_time}</td>
                  <td className="p-4 border-b text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.period_type === 'CLASS' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {p.period_type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* WORKING DAYS TAB */}
        {activeTab === 'days' && (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.days.map((day) => (
              <div key={day.id} className={`p-5 rounded-2xl border-2 transition ${day.is_weekend ? 'border-red-100 bg-red-50' : 'border-blue-100 bg-blue-50'}`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-800">{day.day_display}</h3>
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${day.is_weekend ? 'bg-red-200 text-red-700' : 'bg-blue-200 text-blue-700'}`}>
                    {day.is_weekend ? 'Weekend' : 'Work Day'}
                  </span>
                </div>
                <button 
                  onClick={() => toggleDayStatus(day)}
                  className={`w-full py-2 rounded-lg font-bold text-sm transition bg-white border ${day.is_weekend ? 'text-red-600 border-red-200 hover:bg-red-600 hover:text-white' : 'text-blue-600 border-blue-200 hover:bg-blue-600 hover:text-white'}`}
                >
                  {day.is_weekend ? 'Make Working Day' : 'Mark as Weekend'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* CLASSES TAB */}
        {activeTab === 'classes' && (
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.classes.map(c => (
                <div key={c.id} className="p-4 bg-slate-50 border rounded-xl text-center">
                  <div className="text-2xl font-bold text-blue-600">{c.numeric_value}</div>
                  <div className="text-sm font-medium text-slate-600">{c.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTIONS TAB */}
        {activeTab === 'sections' && (
          <div className="p-6 space-y-4">
            {data.sections.map(s => (
              <div key={s.id} className="flex justify-between items-center p-4 border rounded-xl hover:shadow-md transition">
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">Section: {s.name}</h4>
                  <p className="text-sm text-slate-500">Room Number: <span className="text-slate-800">{s.classroom_number || 'Not Assigned'}</span></p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase">Max Capacity</p>
                  <p className="text-xl font-bold text-blue-600">{s.capacity}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* YEARS TAB */}
        {activeTab === 'years' && (
          <div className="p-6">
            {data.years.map(y => (
              <div key={y.id} className={`flex justify-between items-center p-4 mb-3 rounded-xl border-2 ${y.is_active ? 'border-green-200 bg-green-50' : 'border-gray-100'}`}>
                <div>
                  <span className="text-lg font-bold text-slate-800">{y.year}</span>
                  {y.is_active && <span className="ml-3 text-[10px] bg-green-200 text-green-700 px-2 py-0.5 rounded-full font-bold">CURRENT SESSION</span>}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default SettingsPage;