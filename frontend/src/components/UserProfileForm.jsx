import axios from 'axios';

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  try {
    const res = await axios.post('/api/user', formData);
    alert(res.data.msg);
  } catch (err) {
    alert('Error submitting profile');
  }
};

import { useState } from 'react';

const UserProfileForm = () => {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', address: '',
    emergencyName: '', emergencyRelation: '', emergencyPhone: ''
  });
  const [files, setFiles] = useState({ idCard: null, insurance: null });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) formData.append(key, form[key]);
    if (files.idCard) formData.append('idCard', files.idCard);
    if (files.insurance) formData.append('insurance', files.insurance);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    alert(data.msg || data.error);
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>User Profile</h2>
      <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} required />
      <textarea name="address" placeholder="Address" onChange={handleChange}></textarea>
      <h3>Emergency Contact</h3>
      <input name="emergencyName" placeholder="Name" onChange={handleChange} />
      <input name="emergencyRelation" placeholder="Relation" onChange={handleChange} />
      <input name="emergencyPhone" placeholder="Phone" onChange={handleChange} />
      <h3>Upload Documents</h3>
      <input type="file" name="idCard" onChange={handleFileChange} />
      <input type="file" name="insurance" onChange={handleFileChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserProfileForm;
