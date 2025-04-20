import React, { useState } from 'react';
import './UploadProduct.css';
import { useNavigate } from 'react-router-dom';

const UploadProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with real API call
    console.log('Submitting product:', formData);
    alert('Product uploaded successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="upload-product">
      <header>
        <h2>Upload Recyclable Product</h2>
        <button onClick={() => navigate(-1)}>Back</button>
      </header>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" name="title" required value={formData.title} onChange={handleChange} />

        <label>Category</label>
        <input type="text" name="category" required value={formData.category} onChange={handleChange} />

        <label>Description</label>
        <textarea name="description" required value={formData.description} onChange={handleChange}></textarea>

        <label>Upload Image</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} />

        {imagePreview && (
          <div className="preview-box">
            <img src={imagePreview} alt="preview" />
          </div>
        )}

        <button type="submit">Submit Product</button>
      </form>
    </div>
  );
};

export default UploadProduct;
