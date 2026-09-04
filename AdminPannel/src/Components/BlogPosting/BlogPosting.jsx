import React, { useState, useEffect, useRef } from 'react';
import API, { IMG_URL } from "../../api/axios";
import { FaUsers } from 'react-icons/fa';
import './BlogPosting.css';

const BlogPosting = () => {
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    date: '',
    name: '',
    designation: '',
    title: '',
    description: '',
    category: ''
  });

  const fetchBlogs = async () => {
    try {
      const response = await API.get('/api/blogs');
      if (response.data.success) {
        setData(response.data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setSelectedFile(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please upload an image.');
      return;
    }

    const postData = new FormData();
    postData.append('image', selectedFile);
    postData.append('date', formData.date);
    postData.append('name', formData.name);
    postData.append('designation', formData.designation);
    postData.append('title', formData.title);
    postData.append('description', formData.description);
    postData.append('category', formData.category);

    try {
      const response = await API.post('/api/blogs/create', postData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        fetchBlogs();
        setFormData({ date: '', name: '', designation: '', title: '', description: '', category: '' });
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error creating blog:', error.response?.data?.message || error.message);
    }
  };

  // Robust URL formatting function
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/50?text=No+Img';

    // Return as-is if string starts with HTTP/HTTPS protocol
    if (typeof imagePath === 'string' && /^https?:\/\//i.test(imagePath)) {
      return imagePath;
    }

    const cleanPath = String(imagePath).replace(/\\/g, '/').replace(/^\/+/, '');
    const hostBase = IMG_URL 
      ? IMG_URL.replace(/\/$/, '') 
      : (API.defaults.baseURL ? API.defaults.baseURL.replace(/\/$/, '') : 'http://localhost:5000');

    if (cleanPath.startsWith('uploads/')) {
      return `${hostBase}/${cleanPath}`;
    }
    return `${hostBase}/uploads/${cleanPath}`;
  };

  return (
    <div className="BlogPosting">
      <main className="BlogPosting__main">
        <h1><FaUsers /> Team Management</h1>
        <div className="BlogPosting__container">
          <section className="BlogPosting__form">
            <h3>Add Team Member</h3>
            <form onSubmit={handleSubmit}>
              <input 
                type="file" 
                name="image" 
                ref={fileInputRef}
                onChange={handleChange} 
                accept="image/*"
                required 
              />
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                required 
              />
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Name" 
                required 
              />
              <input 
                type="text" 
                name="designation" 
                value={formData.designation} 
                onChange={handleChange} 
                placeholder="Designation" 
                required 
              />
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="Title" 
                required 
              />
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Description" 
                required 
              />
              <input 
                type="text" 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                placeholder="Category" 
                required 
              />
              <button type="submit">Submit</button>
            </form>
          </section>

          <section className="BlogPosting__list">
            <h3>Team Members List</h3>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img 
                        src={getImageUrl(item.image)} 
                        alt={item.title || 'Team member'} 
                        width="50" 
                        height="50" 
                        style={{ objectFit: 'cover', borderRadius: '4px' }} 
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = 'https://via.placeholder.com/50?text=No+Img';
                        }}
                      />
                    </td>
                    <td>{item.date}</td>
                    <td>{item.name}</td>
                    <td>{item.designation}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
};

export default BlogPosting;