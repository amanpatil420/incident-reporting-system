import { useState } from 'react';

const IncidentForm = () => {
  const [form, setForm] = useState({ type: '', details: '', severity: 'Low' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.msg || data.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Report Incident</h2>
      <input name="type" placeholder="Type" value={form.type} onChange={handleChange} required />
      <textarea name="details" placeholder="Details" value={form.details} onChange={handleChange} required />
      <select name="severity" value={form.severity} onChange={handleChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default IncidentForm;
