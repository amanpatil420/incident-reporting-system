import { useEffect, useState } from 'react';
import axios from 'axios';

function AuthorityPage() {
  const [reports, setReports] = useState([]);
  const [updates, setUpdates] = useState({}); // Temporary input storage

  useEffect(() => {
    axios.get('/api/report')
      .then(res => setReports(res.data))
      .catch(err => console.error('Fetch failed:', err.message));
  }, []);

  const handleInputChange = (id, field, value) => {
    setUpdates(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (id) => {
    try {
      const { status, actionsTaken } = updates[id] || {};
      const res = await axios.put(`/api/report/${id}`, { status, actionsTaken });
      setReports(reports.map(r => (r._id === id ? res.data : r)));
      alert("✅ Report updated successfully!");
    } catch (err) {
      console.error('❌ PUT error:', err.message);
      alert("❌ Failed to update report.");
    }
  };

  return (
    <div>
      <h2>Authority Dashboard – Manage Reports</h2>
      {reports.map((report) => (
        <div key={report._id} style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
          <p><strong>Description:</strong> {report.description}</p>
          <label>Status:</label>
          <select
            value={updates[report._id]?.status || report.status}
            onChange={(e) => handleInputChange(report._id, 'status', e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>

          <label>Actions Taken:</label>
          <textarea
            value={updates[report._id]?.actionsTaken || report.actionsTaken || ''}
            onChange={(e) => handleInputChange(report._id, 'actionsTaken', e.target.value)}
            rows="3"
            style={{ width: '100%', marginBottom: '10px' }}
          />

          <button onClick={() => handleSubmit(report._id)}>Submit</button>
        </div>
      ))}
    </div>
  );
}

export default AuthorityPage;
